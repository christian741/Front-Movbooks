import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'books',
        loadChildren: () => import('./books/books.module').then( m => m.BooksPageModule)
      },
      {
        path: 'books/:id',
        loadChildren: () => import('./books/details-book/details-book.module').then( m => m.DetailsBookPageModule)
      },
      {
        path: 'genders',
        loadChildren: () => import('./genders/genders.module').then( m => m.GendersPageModule)
      },
      {
        path: 'genders/:id',
        loadChildren: () => import('./genders/details-gender/details-gender.module').then( m => m.DetailsGenderPageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
      },
      {
        path: 'pqrs',
        loadChildren: () => import('./pqrs/pqrs.module').then( m => m.PqrsPageModule)
      },
      {
        path: 'movies',
        loadChildren: () => import('./movies/movies.module').then( m => m.MoviesPageModule)
      },
      {
        path: 'movies/:id',
        loadChildren: () => import('./movies/details-movie/details-movie.module').then( m => m.DetailsMoviePageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
