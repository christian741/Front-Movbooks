import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
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
        path: 'movies',
        loadChildren: () => import('./movies/movies.module').then( m => m.MoviesPageModule)
      },
      {
        path: 'movies/:id',
        loadChildren: () => import('./movies/details-movie/details-movie.module').then( m => m.DetailsMoviePageModule)
      },
      {
        path: 'pqrs',
        loadChildren: () => import('./pqrs/pqrs.module').then( m => m.PqrsPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}


