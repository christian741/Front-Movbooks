import { Book } from './../../../models/book.model';
import { ToastService } from './../../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { BooksService } from '../../../services/books.service';
import { CreateBookPage } from './create-book/create-book.page';
import { BookFilter } from '../../../query-filters/book.filter';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {

  booksDetails: any[] = [];

  constructor(
    private booksService: BooksService,
    private toastService: ToastService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.booksService.dataChanges
          .subscribe(message => {
            this.toastService.presentToast({ message, duration: 2000 });
            this.loadBooks();
          });
    this.loadBooks();
  }

  async loadBooks() {
    const filters: BookFilter = {
      pageSize: 1000,
      pageNumber: 1,
      title: '',
      aggregated: true
    };

    const loading = await this.loadingCtrl.create({ message: 'Cargando información...' });
    await loading.present();

    this.booksDetails = [];
    this.booksService.getBooks(filters)
          .subscribe(({ data }) => {
            if (data.length === 0) {
              loading.dismiss();
              return;
            }
            // Recorrer books de la BD
            data.forEach((book: Book) => {
              // Obtener los detalles del libro
              this.booksService.getBookDetails(book.title)
                  .subscribe(bookDetails => {
                    if (bookDetails) {
                      bookDetails.bookId = book.id;
                      this.booksDetails.push(bookDetails);
                      // Ocultar Loading
                      if (this.booksDetails.length === data.length){
                        loading.dismiss();
                      }
                    } else {
                      loading.dismiss();
                    }
                  });
            });
          });
  }

  async presentModalCreateOrUpdate(bookId?: number) {
    const modal = await this.modalCtrl.create({
      component: CreateBookPage,
      componentProps: bookId ? { bookId } : {}
    });
    return await modal.present();
  }
}

