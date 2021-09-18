import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { IonicModule } from '@ionic/angular';


import { DetailsGenderPage } from './details-gender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule
  ],
  declarations: [DetailsGenderPage]
})
export class DetailsGenderPageModule {}
