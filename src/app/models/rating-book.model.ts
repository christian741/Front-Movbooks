import { User } from './user.model';
import { Book } from './book.model';

export class RatingBook {
    id?: number;
    userId?: number;
    bookId?: number;
    rating?: number;
    ratingDate?: Date;
    comment?: string;
    user?: User;
    book?: Book;
}

