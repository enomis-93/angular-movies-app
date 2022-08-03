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
  categoryID!: number;

  file1!: any;
  file2!: any;

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

    this.moviesService.addMovie(this.movie).subscribe((data) => {
      console.log(data);
      this.router.navigateByUrl('movies_list');
    });
  }

  getCategoryID(category: string, index: number = 0) {
    let cat = this.categories.find((cat) => cat.name === category);
    this.categoryID = cat.id;
    this.movie.category[index].id = this.categoryID;
    // return cat.id || 'null';
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
        return;
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

  uploadFile(event: any) {
    this.file1 = event.target.value;
    this.file2 = event.target.files[0];
    this.movie.path_locandina = this.file2.name;
    console.log(this.file1); // in this case we only get fakepath same as we get in ngModel.
    console.table(this.file2.name); // in this case we get object with data like, name, lastModified, lastModifiedDate, size and type.
  }
}
