import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../../shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { BooksPage } from './books.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: BooksPage }])
  ],
  declarations: [BooksPage]
})
export class BooksPageModule {}

