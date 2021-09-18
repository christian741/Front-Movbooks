import { RatingsMoviesComponent } from './ratings-movies/ratings-movies.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { CardBookComponent } from './card-book/card-book.component';
import { CardMovieComponent } from './card-movie/card-movie.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { RatingComponent } from './rating/rating.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingsBooksComponent } from './ratings-books/ratings-books.component';

@NgModule({
  declarations: [
    AvatarSelectorComponent,
    CardBookComponent,
    CardMovieComponent,
    ImageUploadComponent,
    RatingComponent,
    RatingsBooksComponent,
    RatingsMoviesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AvatarSelectorComponent,
    CardBookComponent,
    CardMovieComponent,
    ImageUploadComponent,
    RatingComponent,
    RatingsBooksComponent,
    RatingsMoviesComponent
  ]
})
export class ComponentsModule { }
