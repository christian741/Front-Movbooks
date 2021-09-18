import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';
import { ComponentsModule } from '../../../../components/components.module';

import { DetailsBookPage } from './details-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: DetailsBookPage }])
  ],
  declarations: [DetailsBookPage]
})
export class DetailsBookPageModule {}
