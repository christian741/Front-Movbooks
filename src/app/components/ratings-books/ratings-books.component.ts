import { RatingBook } from './../../models/rating-book.model';
import { Component, Input, OnInit } from '@angular/core';
import { RatingsBooksService } from '../../services/ratings-books.service';

@Component({
  selector: 'app-ratings-books',
  templateUrl: './ratings-books.component.html',
  styleUrls: ['./ratings-books.component.scss'],
})
export class RatingsBooksComponent implements OnInit {

  @Input() bookId: number;

  // Listado de ratings books
  ratingsBooks: RatingBook[] = [];
  // Pagination
  pageSize = 10;
  pageNumber = 1;
  totalCount = 0;

  constructor(private ratingsBooksService: RatingsBooksService) { }

  ngOnInit() {
    this.loadRatingsBooks();
  }

  loadRatingsBooks(): void {
    const filters = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      bookId: this.bookId
    };
    this.ratingsBooksService.getAll(filters).subscribe(({ data, meta }) => {
      this.totalCount = meta.totalCount;
      this.ratingsBooks.push(...data);
    });
  }

}
