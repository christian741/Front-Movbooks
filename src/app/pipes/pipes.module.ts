import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarImgPipe } from './avatar-img.pipe';
import { UsersFilterPipe } from './users-filter.pipe';
import { PqrsFilterPipe } from './pqrs-filter.pipe';
import { MovieImgPipe } from './movie-img.pipe';
import { ImageUrlPipe } from './image-url.pipe';

@NgModule({
  declarations: [
    AvatarImgPipe,
    UsersFilterPipe,
    PqrsFilterPipe,
    MovieImgPipe,
    ImageUrlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AvatarImgPipe,
    UsersFilterPipe,
    PqrsFilterPipe,
    MovieImgPipe,
    ImageUrlPipe
  ]
})
export class PipesModule { }
