import { Book } from './../../../../models/book.model';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BooksService } from '../../../../services/books.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.page.html',
  styleUrls: ['./create-book.page.scss'],
})
export class CreateBookPage implements OnInit {

  @Input() bookId: number;
  bookForm: FormGroup;

  slideOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

  constructor(
    private booksService: BooksService,
    public modalCtrl: ModalController,
    private toastService: ToastService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // init form
    this.initForm();
    // patch value
    if (this.bookId) {
      this.booksService.getBook(this.bookId)
          .subscribe(book => {
            this.bookForm.patchValue(book);
          });
    }
  }

  initForm(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', Validators.minLength(6)]
    }, {
      validators: this.uniqueTitle('title')
    });
  }

  submit(): void {
    const { title } = this.bookForm.value;
    this.booksService.getBookDetails(title)
        .subscribe(bookDetails => {
          if (!bookDetails) {
            this.toastService.presentToast({
              message: 'No existe un libro con el título ingresado',
              duration: 2000
            });
          } else {
            // registrar / actualizar
            if (this.bookId){
              this.udpate();
            } else {
              this.register();
            }
          }
        });
  }

  register(): void {
    this.booksService.insertBook(this.bookForm.value)
          .subscribe(book => {
            this.modalCtrl.dismiss();
            this.booksService.dataChanges.next('El libro ha sido registrado!');
          });
  }

  udpate(): void {
    const book: Book = {
      ...this.bookForm.value,
      id: this.bookId
    };
    this.booksService.updateBook(this.bookId, book)
          .subscribe(_ => {
            this.modalCtrl.dismiss();
            this.booksService.dataChanges.next('El libro ha sido actualizado!');
          });
  }

  // Validator unique title tanto en insert como en udpate
  uniqueTitle(title: string) {
    return (formGroup: FormGroup) => {
      const titleControl = formGroup.get(title);
      if (titleControl.value && titleControl.dirty && !titleControl.hasError('uniqueTitle')) {
        this.booksService.findByTitle(this.bookId, titleControl.value)
                .subscribe(book => {
                  if (book){
                    titleControl.setErrors({ uniqueTitle: true });
                  }
                });
      }
    };
  }

  get title() {
    return this.bookForm.get('title');
  }

  get description() {
    return this.bookForm.get('description');
  }

}
