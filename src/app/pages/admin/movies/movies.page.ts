import { Component, OnInit } from '@angular/core';
import { Movie } from './../../../models/movie.model';
import { LoadingController, ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { MoviesService } from '../../../services/movies.service';
import { CreateMoviePage } from './create-movie/create-movie.page';
import { MovieFilter } from '../../../query-filters/movie.filter';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  moviesDetails: any[] = [];

  constructor(
    private moviesService: MoviesService,
    private toastService: ToastService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.moviesService.dataChanges
          .subscribe(message => {
            this.toastService.presentToast({ message, duration: 2000 });
            this.loadMovies();
          });
    this.loadMovies();
  }

  async loadMovies() {
    const filters: MovieFilter = {
      pageSize: 1000,
      pageNumber: 1,
      title: '',
      aggregated: true
    };

    const loading = await this.loadingCtrl.create({ message: 'Cargando información...' });
    await loading.present();

    this.moviesDetails = [];
    this.moviesService.getMovies(filters)
          .subscribe(({ data }) => {
            if (data.length === 0){
              loading.dismiss();
              return;
            }
            // Recorrer movies objects de la BD
            data.forEach((movie: Movie) => {
              this.moviesService.getMovieDetails(movie.title)
                  .subscribe(movieDetails => {
                    if (movieDetails) {
                      movieDetails.movieId = movie.id;
                      this.moviesDetails.push(movieDetails);
                      // ocultar loading
                      if (this.moviesDetails.length === data.length){
                        loading.dismiss();
                      }
                    } else {
                      loading.dismiss();
                    }
                  });
            });
          });
  }

  async presentModalCreateOrUpdate(movieId?: number) {
    const modal = await this.modalCtrl.create({
      component: CreateMoviePage,
      componentProps: movieId ? { movieId } : {}
    });
    return await modal.present();
  }

}
