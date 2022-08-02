import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/classes/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css'],
})
export class AdminFormComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  categories: any[] = [];
  localUrl: any[] = [];

  movie = new Movie();
  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.setCategories();
  }

  addMovie() {
    this.moviesService.addMovie(this.movie).subscribe((data) => {
      console.log(data);
      this.router.navigateByUrl('movies_list');
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
