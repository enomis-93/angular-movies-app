import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('movieInput') movieInput!: ElementRef;
  searchString: string = 'test';

  categories: any[] = [];

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.setCategories();
    this.commonService.data$.subscribe((res) => (this.searchString = res)); //read the invoked data or default data
  }

  setCategories() {
    this.moviesService.getCategories().subscribe((res: any) => {
      console.log(res);
      this.categories = res;
    });
  }

  onMovieSubmit() {
    this.searchString = this.movieInput.nativeElement.value;
    this.commonService.changeData(this.searchString);
    this.movieInput.nativeElement.value = '';
  }
}
