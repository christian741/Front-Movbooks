import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { ComponentsModule } from '../../../../components/components.module';
import { PipesModule } from '../../../../pipes/pipes.module';

import { IonicModule } from '@ionic/angular';

import { DetailsMoviePage } from './details-movie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ComponentsModule,
    PipesModule,
    RouterModule.forChild([{ path: '', component: DetailsMoviePage }])
  ],
  declarations: [DetailsMoviePage]
})
export class DetailsMoviePageModule {}
