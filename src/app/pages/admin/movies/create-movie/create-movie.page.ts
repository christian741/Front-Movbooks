import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, AlertController } from '@ionic/angular';
import { MoviesService } from '../../../../services/movies.service';
import { Movie } from '../../../../models/movie.model';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.page.html',
  styleUrls: ['./create-movie.page.scss'],
})

export class CreateMoviePage implements OnInit {

  @Input() movieId: number;
  movieForm: FormGroup;

  slideOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

  constructor(
    private moviesService: MoviesService,
    public modalCtrl: ModalController,
    private toastService: ToastService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // init form
    this.initForm();
    // patch value
    if (this.movieId) {
      this.moviesService.getMovie(this.movieId)
          .subscribe(movie => {
            this.movieForm.patchValue(movie);
          });
    }
  }

  initForm(): void {
    this.movieForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', Validators.minLength(6)]
    }, {
      validators: this.uniqueTitle('title')
    });
  }

  submit(): void {
    const { title } = this.movieForm.value;
    this.moviesService.getMovieDetails(title)
          .subscribe(movieDetails => {
            if (!movieDetails) {
              this.toastService.presentToast({
                message: 'No existe una película con el título ingresado',
                duration: 2000
              });
            } else { // Registrar / Actualizar registro de película
              if (this.movieId){
                this.udpate();
              } else {
                this.register();
              }
            }
          });
  }

  register(): void {
    this.moviesService.insertMovie(this.movieForm.value)
          .subscribe(_ => {
            this.modalCtrl.dismiss();
            this.moviesService.dataChanges.next('La película ha sido registrada!');
          });
  }

  udpate(): void {
    const movie: Movie = {
      ...this.movieForm.value,
      id: this.movieId
    };
    this.moviesService.updateMovie(this.movieId, movie)
          .subscribe(_ => {
            this.modalCtrl.dismiss();
            this.moviesService.dataChanges.next('La película ha sido actualizada!');
          });
  }

  // Validator unique title tanto en insert como en udpate
  uniqueTitle(title: string) {
    return (formGroup: FormGroup) => {
      const titleControl = formGroup.get(title);
      if (titleControl.value && titleControl.dirty && !titleControl.hasError('uniqueTitle')) {
        this.moviesService.findByTitle(this.movieId, titleControl.value)
            .subscribe(movie => {
              if (movie){
                titleControl.setErrors({ uniqueTitle: true });
              }
            });

      }
    };
  }

  get title() {
    return this.movieForm.get('title');
  }

  get description() {
    return this.movieForm.get('description');
  }

}
