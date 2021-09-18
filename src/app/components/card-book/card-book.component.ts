import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.scss'],
})
export class CardBookComponent implements OnInit {

  @Input() bookDetails: any;
  @Input() editable = false;
  @Output() presentEdit = new EventEmitter<number>();

  constructor(
    private router: Router,
    private booksService: BooksService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    // console.log(this.bookDetails);
  }

  details(bookId: number) {
    this.router.navigate([this.editable ? 'admin' : 'dashboard', 'books', bookId]);
  }

  edit(bookId: number) {
    this.presentEdit.emit(bookId);
  }

  async presentAlertConfirm(bookId: number) {
    const alert = await this.alertCtrl.create({
      header: '¿Estás seguro?',
      message: 'No podrás revertir los cambios',
      cssClass: 'alert-buttons',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btn-cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Eliminar',
          cssClass: 'btn-confirm-delete',
          handler: () => {
            this.booksService.deleteBook(bookId)
                .subscribe(resp => {
                  this.booksService.dataChanges.next('El libro ha sido eliminado!');
                });
          }
        }
      ]
    });

    await alert.present();
  }

}
