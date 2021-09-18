import { User } from 'src/app/models/user.model';
import { RatingMovie } from '../../../../models/rating-movie.model';
import { MoviesService } from './../../../../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ToastService } from '../../../../services/toast.service';
import { RatingsMoviesService } from '../../../../services/ratings-movies.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-details-movie',
  templateUrl: './details-movie.page.html',
  styleUrls: ['./details-movie.page.scss'],
})
export class DetailsMoviePage implements OnInit {

  movieId: number;
  currentUser: User;

  slideOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

  movieDetails: any;
  readMore = false;

  // Para el componente de rating
  ratingMovie: RatingMovie;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MoviesService,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    private ratingsMoviesService: RatingsMoviesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(({ id }) => {
      if (!id) {
        this.router.navigateByUrl('/dashboard/books');
        return;
      }
      this.movieId = id;

      // Cargar detalles de la película
      this.loadMovieDetails();
      // Cargar detalles de la calificación
      this.loadRatingMovie();
    });
  }

  async loadMovieDetails() {
    const loading = await this.loadingCtrl.create({ message: 'Cargando información...' });
    await loading.present();

    this.movieService.getMovie(this.movieId).subscribe(movie => {
      if (!movie){
        loading.dismiss();
        this.router.navigateByUrl('/dashboard/movies');
        return;
      }

      this.movieService.getMovieDetails(movie.title).subscribe(movieDetails => {
        this.movieDetails = movieDetails;
        loading.dismiss();
      });
    });
  }

  async loadRatingMovie() {
    const loading = await this.loadingCtrl.create({ message: 'Cargando información...' });
    await loading.present();

    this.currentUser = await this.authService.getCurrentUserAsync();

    this.ratingsMoviesService.find(this.currentUser.id, this.movieId).subscribe(data => {
      this.ratingMovie = data;
      loading.dismiss();
    });
  }

  // Submit para el formulario de calificación
  submit(data: any): void {
    const object: RatingMovie = {
      ... data,
      userId: this.currentUser.id,
      movieId: this.movieId
    };

    if (this.ratingMovie?.id) {
      object.id = this.ratingMovie.id;
      this.update(object);
    } else {
      this.insert(object);
    }
  }

  // Insertar nuevo registro
  insert(data: RatingMovie): void {
    this.ratingsMoviesService.insert(data).subscribe((res: RatingMovie) => {
      this.ratingMovie = res;
      this.toastService.presentToast({ message: 'La película ha sido calificada', duration: 2000 });
    });
  }

  // Actualizar el registro
  update(data: RatingMovie): void {
    this.ratingsMoviesService.update(data).subscribe(_ => {
      this.toastService.presentToast({ message: 'La películas ha sido calificada', duration: 2000 });
    });
  }
}
