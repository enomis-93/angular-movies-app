import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { CommonService } from '../../services/common.service';
import { Movie } from '../../classes/movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit {
  id: any = 0;
  movies: Movie[] = [];
  searchString: string = '';

  constructor(
    private moviesService: MoviesService,
    private activeRoute: ActivatedRoute,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.commonService.data$.subscribe((res) => {
      this.searchString = res;
      this.showSearch();
    });
    this.getParamID();
  }

  showSearch() {
    if (this.searchString) {
      this.getMoviesContainsString(this.searchString);
      return;
    }
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
      // console.log(res);
      this.movies = res;
    });
  }

  showMoviesByCategory(id: number) {
    this.moviesService.getMoviesByCategory(id).subscribe((res: any) => {
      // console.log(res);
      this.movies = res;
    });
  }

  getMoviesContainsString(string: string) {
    this.moviesService.getMovieByString(string).subscribe((res: any) => {
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
