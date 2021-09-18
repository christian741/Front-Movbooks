import { Movie } from './movie.model';
import { User } from './user.model';

export class RatingMovie {
    id?: number;
    userId?: number;
    movieId?: number;
    rating?: number;
    ratingDate?: Date;
    comment?: string;
    user?: User;
    movie?: Movie;
}

