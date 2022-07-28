import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getAllMovies() {
    return this.http.get('https://cc45-176-62-159-134.eu.ngrok.io/film/all');
  }

  getMovieById(id: number) {
    return this.http.get(`https://cc45-176-62-159-134.eu.ngrok.io/film/${id}`);
  }

  getMoviesByCategory(categoryId: number) {
    return this.http.get(
      `https://cc45-176-62-159-134.eu.ngrok.io/categoria/${categoryId}`
    );
  }

  getCategories() {
    return this.http.get(
      'https://cc45-176-62-159-134.eu.ngrok.io/categoria/all'
    );
  }
}
