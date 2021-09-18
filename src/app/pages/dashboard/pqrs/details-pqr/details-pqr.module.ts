import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../../../shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { DetailsPqrPage } from './details-pqr.page';
import { PipesModule } from '../../../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PipesModule
  ],
  declarations: [DetailsPqrPage]
})
export class DetailsPqrPageModule {}
