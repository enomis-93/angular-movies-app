import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MoviesService } from './services/movies.service';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieDetailComponent } from './components/movies-list/movie-detail/movie-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { MoviesListAdminComponent } from './components/movies-list-admin/movies-list-admin.component';
import { AdminFormComponent } from './components/admin-form/admin-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MoviesListComponent,
    MovieDetailComponent,
    PageNotFoundComponent,
    MoviesListAdminComponent,
    AdminFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [MoviesService, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
