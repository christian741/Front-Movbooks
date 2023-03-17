import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { UserGuard } from '../guards/user.guard';

const routes: Routes = [
  {
    path: 'general',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'dashboard',
    canLoad: [AuthGuard, UserGuard],
    canActivate: [AuthGuard, UserGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'admin',
    canLoad: [AuthGuard, AdminGuard],
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
