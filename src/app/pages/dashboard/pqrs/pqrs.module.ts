import { PipesModule } from './../../../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './../../../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { DetailsPqrPageModule } from './details-pqr/details-pqr.module';

import { PqrsPage } from './pqrs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PipesModule,
    DetailsPqrPageModule,
    RouterModule.forChild([{ path: '', component: PqrsPage }])
  ],
  declarations: [PqrsPage]
})
export class PqrsPageModule {}
