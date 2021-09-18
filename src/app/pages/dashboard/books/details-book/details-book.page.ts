import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BooksService } from '../../../../services/books.service';
import { AuthService } from '../../../../services/auth.service';
import { RatingsBooksService } from '../../../../services/ratings-books.service';
import { RatingBook } from '../../../../models/rating-book.model';
import { User } from '../../../../models/user.model';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.page.html',
  styleUrls: ['./details-book.page.scss'],
})
export class DetailsBookPage implements OnInit {

  bookId: number;
  currentUser: User;

  slideOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

  bookDetails: any;
  readMore = false;

  // Para el componente de rating
  ratingBook: RatingBook;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private booksService: BooksService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private ratingsBooksService: RatingsBooksService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(({ id }) => {
      if (!id) {
        this.router.navigateByUrl('/dashboard/books');
        return;
      }
      this.bookId = id;

      // Cargar detalles del libro
      this.loadBookDetails();
      // Cargar detalles de la calificación
      this.loadRatingBook();
    });
  }

  async loadBookDetails() {
    const loading = await this.loadingCtrl.create({ message: 'Cargando información...' });
    await loading.present();

    this.booksService.getBook(this.bookId).subscribe(book => {
      if (!book) {
        loading.dismiss();
        this.router.navigateByUrl('/dashboard/books');
        return;
      }

      this.booksService.getBookDetails(book.title).subscribe(bookDetails => {
        this.bookDetails = bookDetails;
        loading.dismiss();
      });
    });
  }

  async loadRatingBook() {
    const loading = await this.loadingCtrl.create({ message: 'Cargando información...' });
    await loading.present();

    this.currentUser = await this.authService.getCurrentUserAsync();

    this.ratingsBooksService.find(this.currentUser.id, this.bookId).subscribe(data => {
      this.ratingBook = data;
      loading.dismiss();
    });
  }

  // Submit para el formulario de calificación
  submit(data: any): void {
    const object: RatingBook = {
      ... data,
      userId: this.currentUser.id,
      bookId: this.bookId
    };

    if (this.ratingBook?.id) {
      object.id = this.ratingBook.id;
      this.update(object);
    } else {
      this.insert(object);
    }
  }

  // Insertar nuevo registro
  insert(data: RatingBook): void {
    this.ratingsBooksService.insert(data).subscribe((res: RatingBook) => {
      this.ratingBook = res;
      this.toastService.presentToast({ message: 'El libro ha sido calificado', duration: 2000 });
    });
  }

  // Actualizar el registro
  update(data: RatingBook): void {
    this.ratingsBooksService.update(data).subscribe(_ => {
      this.toastService.presentToast({ message: 'El libro ha sido calificado', duration: 2000 });
    });
  }

}
