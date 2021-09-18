import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { PageNotFoundPage } from './page-not-found.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([ { path: '', component: PageNotFoundPage } ])
  ],
  declarations: [PageNotFoundPage]
})
export class PageNotFoundPageModule {}
