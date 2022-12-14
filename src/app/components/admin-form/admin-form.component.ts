import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/classes/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ImageUploadService } from '../../services/image-upload.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { json } from 'express';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css'],
})
export class AdminFormComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  categories: any[] = [];
  localUrl: any[] = [];
  movieID!: number;
  movie = new Movie();
  categoryID!: number;

  // Form validation
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    director: new FormControl(''),
    year: new FormControl(''),
    duration: new FormControl(''),
    category: new FormControl(''),
    plot: new FormControl(''),
    poster: new FormControl(''),
  });
  submitted = false;
  addForm!: FormGroup;

  // Image upload
  uploadedImage!: any;
  dbImage: any;
  postResponse: any;
  successResponse!: string;
  image: any;
  getImageName: any;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    // this.createForm();
  }

  ngOnInit(): void {
    this.setCategories();
    this.getMovieID();

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      year: [
        '',
        [
          Validators.required,
          Validators.min(1500),
          Validators.max(this.currentYear),
        ],
      ],
      duration: [
        '',
        [Validators.required, Validators.min(80), Validators.max(9000)],
      ],
      category: ['', Validators.required],
      plot: ['', Validators.required],
    });
  }

  // ADD NEW CATEGORY FORM ARRAY METHOD
  initLink() {
    return this.formBuilder.group({
      linkAddress: ['', Validators.required],
    });
  }
  addLink() {
    const control = <FormArray>this.addForm.controls['linktodrive'];
    control.push(this.initLink());
  }
  removeLink(i: number) {
    const control = <FormArray>this.addForm.controls['linktodrive'];
    control.removeAt(i);
  }
  // ---------------------------------

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    console.log(this.form.invalid);
    if (this.form.invalid) {
      return;
    }
    // else send the data submitted
    console.log(JSON.stringify(this.form.value, null, 2));
    this.sendMovieData();
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }

  sendMovieData() {
    // Update Movie Case
    if (this.movieID) {
      this.moviesService
        .editMovie(this.movie, this.movieID)
        .subscribe((data) => {
          console.log('Dati del film inviato:' + JSON.stringify(data));
          this.router.navigateByUrl('movies_list');
        });
      return;
    }
    // Create case
    this.moviesService.addMovie(this.movie).subscribe((data) => {
      console.log('data:' + data);
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
        let movieId = routeParams['id'];
        if (movieId) {
          this.movieID = routeParams['id'];
          this.setMovieDetails(movieId);
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

  // IMAGE UPLOAD METHODS
  public onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
  }

  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);
    this.http
      .post('http://localhost:4200/api/upload/image/', imageFormData, {
        observe: 'response',
      })
      .subscribe((res) => {
        console.log('Upload');
        console.log(res);
        if (res.status === 200) {
          this.postResponse = res;
          this.successResponse = this.postResponse.body.message;
          this.getUploadedImage();
        } else {
          this.successResponse = 'Image not uploaded due to some error!';
        }
      });
  }

  getUploadedImage() {
    console.log('getUploadimage invoked');
    console.log(this.uploadedImage);
    this.http
      .get(
        'http://localhost:4200/api/get/image/info/' + this.uploadedImage.name
      )
      .subscribe((res: any) => {
        console.log('getUploadedImage');
        console.log(res);
        this.setUploadedImage(res);
      });
  }

  setUploadedImage(res: any) {
    // this.postResponse = res;
    console.log('Setto immagine nel movie');

    // Gestione caso edit ?
    if (this.movieID) {
      let image = {
        id_film: this.movie.id,
        id: res.id,
        image: '',
        type: res.type,
        name: res.name,
      };

      this.movie.images.push(image);
      console.log('Oggetto film:' + this.movie);
      return;
    }

    // Caso Create
    let image = {
      id: res.id,
      image: '',
      type: res.type,
      name: res.name,
    };

    this.movie.images.push(image);
    console.log('Oggetto film:' + this.movie);
    // this.movie.images[0].name = res.name;
    // this.movie.images[0].type = res.type;
    // this.movie.images[0].image = res.image;
    // this.dbImage = 'data:image/jpeg;base64,' + this.postResponse.image;
  }

  deleteImage(index: number) {
    this.movie.images.splice(index, 1);
  }

  addNewCategory() {
    this.movie.category.push({ name: '', id: 0 });
  }

  trackByIndex(id: number) {
    return id;
  }
}
