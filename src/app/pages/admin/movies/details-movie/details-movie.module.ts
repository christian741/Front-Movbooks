import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { PipesModule } from '../../../../pipes/pipes.module';

import { DetailsMoviePage } from './details-movie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PipesModule,
    RouterModule.forChild([{ path: '', component: DetailsMoviePage }])
  ],
  declarations: [DetailsMoviePage]
})
export class DetailsMoviePageModule {}
