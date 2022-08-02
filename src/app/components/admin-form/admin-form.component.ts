import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/classes/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css'],
})
export class AdminFormComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  categories: any[] = [];
  localUrl: any[] = [];
  id!: number;
  movie = new Movie();

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setCategories();
    this.getMovieID();
  }

  sendMovieData() {
    // Update Movie Case
    if (this.id) {
      this.moviesService.editMovie(this.movie, this.id).subscribe((data) => {
        console.log(data);
        this.router.navigateByUrl('movies_list');
      });
      return;
    }

    // Create Movie Case
    this.moviesService.addMovie(this.movie).subscribe((data) => {
      console.log(data);
      this.router.navigateByUrl('movies_list');
    });
  }

  // Invoked only if a parameter contains an ID
  getMovieID() {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.activeRoute.params.subscribe((routeParams) => {
        let id = routeParams['id'];
        if (id) {
          this.id = routeParams['id'];
          this.setMovieDetails(id);
        }
      });
    });
  }

  setMovieDetails(id: number) {
    this.moviesService.getMovieById(id).subscribe((res: any) => {
      console.log(res);
      this.movie = res;
    });
  }

  setCategories() {
    this.moviesService.getCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
