import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Movie } from 'src/app/classes/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  id: number = 0;

  movie: Movie = {
    title: '',
    director: ' ',
    duration: 0,
    category: [{ name: '', id: 0 }],
    id: 0,
    path_locandina: '',
    plot: '',
    year: 0,
  };

  styleObject: Object = {
    background:
      'url(../../../../assets/movie-posters/' + this.movie.path_locandina + ')',
    'background-size': 'contain',
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private moviesService: MoviesService
  ) {}
  ngOnInit(): void {
    this.getParamID();
  }

  setMovieDetails(id: number) {
    this.moviesService.getMovieById(id).subscribe((res: any) => {
      console.log(res);
      this.movie = res;
    });
  }

  getParamID() {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.activeRoute.params.subscribe((routeParams) => {
        let id = routeParams['id'];
        this.id = routeParams['id'];
        this.setMovieDetails(id);
      });
    });
  }
}
