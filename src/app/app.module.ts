import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MoviesService } from './services/movies.service';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieDetailComponent } from './components/movies-list/movie-detail/movie-detail.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, MoviesListComponent, MovieDetailComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [MoviesService, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
