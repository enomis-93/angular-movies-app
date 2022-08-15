import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from '../classes/movie';
import { catchError, Observable, throwError } from 'rxjs';
import { Category } from '../classes/category';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<any> {
    return this.http.get('/api/film/all');
  }

  getMovieById(id: number): Observable<any> {
    return this.http.get(`/api/film/${id}`);
  }

  getMoviesByCategory(categoryId: number): Observable<any> {
    return this.http.get(`/api/categoria/${categoryId}`);
  }

  getCategories(): Observable<any> {
    return this.http.get('/api/categoria/all');
  }

  getMovieByString(string: string): Observable<any> {
    return this.http.get(`/api/film/search?title=${string}`);
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`api/film/${id}`);
  }

  addMovie(movie: Movie): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(movie);
    console.log(body);
    return this.http.post('api/film/new', body, { headers: headers });
  }

  editMovie(movie: Movie, id: number): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(movie);
    console.log(body);
    return this.http.put(`api/film/edit/${id}`, body, { headers: headers });
  }

  // createMovie(movie: Movie): Observable<Movie> {
  //   return this.http
  //     .post<Movie>('api/new', JSON.stringify(movie), this.httpOptions)
  //     .pipe(catchError(this.errorHandler));
  // }

  // errorHandler(error: any) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(() => errorMessage);
  // }
}
