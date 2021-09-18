import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

// Shared Components
import { HeaderComponent } from './header/header.component';
import { HeaderModalComponent } from './header-modal/header-modal.component';
import { MenuUserComponent } from './menu-user/menu-user.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderModalComponent,
    MenuUserComponent,
    MenuAdminComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    HeaderModalComponent,
    MenuUserComponent,
    MenuAdminComponent
  ]
})
export class SharedModule { }
