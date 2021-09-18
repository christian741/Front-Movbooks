import { RatingMovie } from './../../models/rating-movie.model';
import { Component, Input, OnInit } from '@angular/core';
import { RatingsMoviesService } from '../../services/ratings-movies.service';

@Component({
  selector: 'app-ratings-movies',
  templateUrl: './ratings-movies.component.html',
  styleUrls: ['./ratings-movies.component.scss'],
})

export class RatingsMoviesComponent implements OnInit {

  @Input() movieId: number;

  // Listado de ratings movies
  ratingsMovies: RatingMovie[] = [];
  // Pagination
  pageSize = 10;
  pageNumber = 1;
  totalCount = 0;

  constructor(private ratingsMoviesService: RatingsMoviesService) { }

  ngOnInit() {
    this.loadRatingsMovies();
  }

  loadRatingsMovies(): void {
    const filters = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      movieId: this.movieId
    };
    this.ratingsMoviesService.getAll(filters).subscribe(({ data, meta }) => {
      this.totalCount = meta.totalCount;
      this.ratingsMovies.push(...data);
    });
  }

}
