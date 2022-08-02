import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './components/movies-list/movie-detail/movie-detail.component';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MoviesListAdminComponent } from './components/movies-list-admin/movies-list-admin.component';
import { AdminFormComponent } from './components/admin-form/admin-form.component';

const routes: Routes = [
  { path: '', component: MoviesListComponent },
  { path: 'home', component: MoviesListComponent },
  { path: 'category/:id', component: MoviesListComponent },
  { path: 'film/:id', component: MovieDetailComponent },

  // Admin Routes
  { path: 'movies_list', component: MoviesListAdminComponent },
  { path: 'movies_list/add', component: AdminFormComponent },
  { path: 'movies_list/edit/:id', component: AdminFormComponent },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
