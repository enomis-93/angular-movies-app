import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { CommonService } from '../../services/common.service';
import { Movie } from '../../classes/movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list-admin.component.html',
  styleUrls: ['./movies-list-admin.component.css'],
})
export class MoviesListAdminComponent implements OnInit {
  id: any = 0;
  movies: Movie[] = [];
  searchString: string = '';

  isErrorStatus: boolean = false;
  showStatusMessage: boolean = false;
  statusMessage: string = '';

  constructor(
    private moviesService: MoviesService,
    private activeRoute: ActivatedRoute,
    private router: Router,
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

  // Delete movie
  deleteMovie(id: number, name: string) {
    // console.log(id);
    let confirmDelete = confirm(`Do you really want to delete "${name}" ?`);
    if (confirmDelete) {
      this.moviesService.deleteMovie(id).subscribe({
        next: () => {
          this.getParamID();
          this.statusMessage = `"${name}" deleted successfully !`;

          this.showStatusMessage = true;

          window.scrollTo(0, 0);
          setTimeout(() => {
            this.showStatusMessage = false;
          }, 5000);
        },
        error: (error) => {
          this.getParamID();
          this.statusMessage = error.message;

          this.isErrorStatus = true;
          this.showStatusMessage = true;

          window.scrollTo(0, 0);
          setTimeout(() => {
            this.showStatusMessage = false;
            this.isErrorStatus = false;
          }, 5000);
        },
      });
    }
  }
}
