import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit {
  id: any = 0;
  movies: any[] = [];

  constructor(
    private moviesService: MoviesService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getParamID();
    // this.showMovies(this.id);
  }

  showMovies(id: number) {
    if (id > 0) {
      this.showMoviesByCategory(id);
      return;
    }
    this.showAllMovies();
  }

  showAllMovies() {
    this.moviesService.getAllMovies().subscribe((res: any) => {
      console.log(res);
      this.movies = res;
    });
  }

  showMoviesByCategory(id: number) {
    this.moviesService.getMoviesByCategory(id).subscribe((res: any) => {
      console.log(res);
      this.movies = res;
    });
  }

  // leggo l'id dai parametri del'url e lo uso per l'eventuale chiamata alla singola categoria
  getParamID() {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.activeRoute.params.subscribe((routeParams) => {
        let id = routeParams['id'];
        this.id = routeParams['id'];
        this.showMovies(id);
      });
    });
  }
}
