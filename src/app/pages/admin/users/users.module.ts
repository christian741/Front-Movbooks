import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { PipesModule } from '../../../pipes/pipes.module';

import { UsersPage } from './users.page';
import { DetailsUserPageModule } from './details-user/details-user.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PipesModule,
    DetailsUserPageModule, // para que funcione correctamente el modal por el LazyLoad
    RouterModule.forChild([{ path: '', component: UsersPage }])
  ],
  declarations: [UsersPage]
})
export class UsersPageModule {}
