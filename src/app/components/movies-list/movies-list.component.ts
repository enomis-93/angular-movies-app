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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getParamID();
    this.showAllMovies();
  }

  showAllMovies() {
    this.moviesService.getAllMovies().subscribe((res: any) => {
      console.log(res);
      this.movies = res;
    });
  }

  // leggo l'id dai parametri del'url e lo uso per l'eventuale chiamata alla singola categoria
  getParamID() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id')) {
        this.id = params.get('id');
      }
    });
  }
}
