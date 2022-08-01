import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const headerDict = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Access-Control-Allow-Headers': '*',
};

const requestOptions = {
  headers: new Headers(headerDict),
};

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getAllMovies() {
    return this.http.get('/api/film/all');
  }

  getMovieById(id: number) {
    return this.http.get(`/api/film/${id}`);
  }

  getMoviesByCategory(categoryId: number) {
    return this.http.get(`/api/categoria/${categoryId}`);
  }

  getCategories() {
    return this.http.get('/api/categoria/all');
  }

  getMovieByString(string: string) {
    return this.http.get(`/api/film/search?title=${string}`);
  }
}
