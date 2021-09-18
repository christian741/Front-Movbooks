import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { ComponentsModule } from '../../../../components/components.module';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailsBookPage } from './details-book.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: DetailsBookPage }])
  ],
  declarations: [DetailsBookPage]
})
export class DetailsBookPageModule {}
