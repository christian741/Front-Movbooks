import { MovieFilter } from './../../../query-filters/movie.filter';
import { MoviesService } from './../../../services/movies.service';
import { ToastService } from './../../../services/toast.service';
import { Movie } from './../../../models/movie.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  // Pagination
  pageSize = 9;
  pageNumber = 1;
  totalCount = 0;

  moviesDetails: any[] = [];
  movies: Movie[] = [];

  // Búsqueda por título
  title: string;

  constructor(
    private moviesService: MoviesService,
    private toastService: ToastService
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
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      aggregated: false,
      title: this.title || ''
    };

    this.moviesService.getMovies(filters)
          .subscribe(({ data, meta }) => {
            this.totalCount = meta.totalCount;
            if (data.length === 0){
              return;
            }

            this.movies.push(...data);

            // Recorrer movies objects de la BD
            data.forEach((movie: Movie) => {
              this.moviesService.getMovieDetails(movie.title)
                  .subscribe(movieDetails => {
                    if (movieDetails) {
                      movieDetails.movieId = movie.id;
                      this.moviesDetails.push(movieDetails);
                    }
                  });
            });
          });
  }

  loadData(event: any) {
    setTimeout(() => {

      // Cambiar de página
      this.pageNumber += 1;
      // Volver a cargar los registros
      this.loadMovies();
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
    this.movies = [];
    this.moviesDetails = [];
    this.pageNumber = 1;
    this.loadMovies();
  }

}
