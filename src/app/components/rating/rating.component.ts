import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {

  ratingOptions = [
    { class: 'fas fa-angry', value: 1 },
    { class: 'fas fa-frown', value: 2 },
    { class: 'fas fa-meh', value: 3 },
    { class: 'fas fa-smile', value: 4 },
    { class: 'fas fa-grin-beam', value: 5 }
  ];

  @Input() data: any;
  @Output() rate = new EventEmitter<any>();

  ratingForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // Inicializar formulario
    this.initForm();
    // Si hay data (actualización de la calificación) ya sea de película o libro
    if (this.data) {
      this.ratingForm.patchValue(this.data);
    }
  }

  initForm(): void {
    this.ratingForm = this.fb.group({
      rating: [0, [Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });
  }

  changeRating(rating: number): void {
    this.rating.setValue(rating);
  }

  // Submit para el formulario
  submit(): void {
    if (this.ratingForm.valid) {
      this.rate.emit(this.ratingForm.value);
    }
  }

  // Getters
  get rating() {
    return this.ratingForm.get('rating');
  }

  get comment() {
    return this.ratingForm.get('comment');
  }

}
