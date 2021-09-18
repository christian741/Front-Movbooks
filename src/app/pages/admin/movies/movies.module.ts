import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from '../../../components/components.module';

import { MoviesPage } from './movies.page';
// Modal
import { CreateMoviePageModule } from './create-movie/create-movie.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ComponentsModule,
    CreateMoviePageModule,
    RouterModule.forChild([{ path: '', component: MoviesPage }])
  ],
  declarations: [MoviesPage]
})
export class MoviesPageModule {}
