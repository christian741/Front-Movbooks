import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../../../services/books.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.page.html',
  styleUrls: ['./details-book.page.scss'],
})
export class DetailsBookPage implements OnInit {

  slideOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

  bookDetails: any;
  readMore = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({ message: 'Cargando información...' });
    await loading.present();

    this.route.params.subscribe(({ id }) => {
      this.booksService.getBook(id).subscribe(book => {
        if (!book) {
          this.loadingCtrl.dismiss();
          this.router.navigateByUrl('/admin/books');
          return;
        }

        this.booksService.getBookDetails(book.title).subscribe(bookDetails => {
          this.bookDetails = bookDetails;
          this.loadingCtrl.dismiss();
        });
      });
    });
  }

}
