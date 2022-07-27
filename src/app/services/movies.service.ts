import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getAllMovies() {
    return this.http.get('');
  }

  getMovieById(id: number) {
    return this.http.get('');
  }

  getMovieByCategory(CategoryId: number) {
    return this.http.get('');
  }
}
