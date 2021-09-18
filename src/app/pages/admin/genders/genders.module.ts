import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';

//Modal
import { CreateGenderPageModule } from './create-gender/create-gender.module';

import { GendersPage } from './genders.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ComponentsModule,
    PipesModule,
    CreateGenderPageModule,
    RouterModule.forChild([{ path: '', component: GendersPage}]),
  ],
  declarations: [GendersPage]
})
export class GendersPageModule {}
