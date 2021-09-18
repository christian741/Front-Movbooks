import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../../shared/shared.module';
import { ComponentsModule } from '../../../../components/components.module';

import { ImageEditPage } from './image-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ComponentsModule
  ],
  declarations: [ImageEditPage]
})
export class ImageEditPageModule {}
