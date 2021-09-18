import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../../../../pipes/pipes.module';
import { SharedModule } from '../../../../shared/shared.module';

import { DetailsUserPage } from './details-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    SharedModule
  ],
  declarations: [DetailsUserPage]
})
export class DetailsUserPageModule {}
