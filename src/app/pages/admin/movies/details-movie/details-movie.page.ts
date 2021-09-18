import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { MoviesService } from '../../../../services/movies.service';

@Component({
  selector: 'app-details-movie',
  templateUrl: './details-movie.page.html',
  styleUrls: ['./details-movie.page.scss'],
})
export class DetailsMoviePage implements OnInit {

  slideOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

  movieDetails: any;
  readMore = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MoviesService,
    private loadingCtrl: LoadingController
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({ message: 'Cargando información...' });
    await loading.present();

    this.route.params.subscribe(({ id }) => {
      this.movieService.getMovie(id).subscribe(movie => {
        if (!movie){
          this.loadingCtrl.dismiss();
          this.router.navigateByUrl('/admin/movies');
          return;
        }

        this.movieService.getMovieDetails(movie.title).subscribe(movieDetails => {
          this.movieDetails = movieDetails;
          this.loadingCtrl.dismiss();
        });
      });
    });
  }

}
