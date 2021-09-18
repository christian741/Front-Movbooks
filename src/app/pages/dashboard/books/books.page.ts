import { BookFilter } from './../../../query-filters/book.filter';
import { Book } from './../../../models/book.model';
import { ToastService } from './../../../services/toast.service';
import { BooksService } from './../../../services/books.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  // Pagination
  pageSize = 9;
  pageNumber = 1;
  totalCount = 0;

  books: Book[] = [];
  booksDetails: any[] = [];

  // Búsqueda por título
  title: string;

  constructor(
    private booksService: BooksService,
    private toastService: ToastService
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
    const filter: BookFilter = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      title: this.title,
      aggregated: false
    };

    this.booksService.getBooks(filter)
          .subscribe(({ data, meta }) => {
            // Definir el total de resultados para el infinite loading
            this.totalCount = meta.totalCount;
            // Si no hay registros
            if (data.length === 0) {
              // loading.dismiss();
              return;
            }
            // Acumular nueva página de libros
            this.books.push(...data);

            // Recorrer books de la BD
            data.forEach((book: Book) => {
              // Obtener los detalles del libro
              this.booksService.getBookDetails(book.title)
                  .subscribe(bookDetails => {
                      if (bookDetails) {
                        bookDetails.bookId = book.id;
                        this.booksDetails.push(bookDetails);
                      }
                    }
                  );
            });
          });
  }

  loadData(event: any) {
    setTimeout(() => {

      // Cambiar de página
      this.pageNumber += 1;
      // Volver a cargar los registros
      this.loadBooks();
      // Complete para el infinite-scroll
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if ((this.pageSize * this.pageNumber) >= this.totalCount) {
        event.target.disabled = true;
      }
    }, 500);
  }

  filterTitle(): void {
    this.books = [];
    this.booksDetails = [];
    this.pageNumber = 1;
    this.loadBooks();
  }

}
