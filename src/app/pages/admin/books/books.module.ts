import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';

import { BooksPage } from './books.page';
// Modal
import { CreateBookPageModule } from './create-book/create-book.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ComponentsModule,
    PipesModule,
    CreateBookPageModule,
    RouterModule.forChild([{ path: '', component: BooksPage }])
  ],
  declarations: [BooksPage]
})
export class BooksPageModule {}
