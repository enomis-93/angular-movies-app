import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  categories: any[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.setCategories();
  }

  setCategories() {
    this.moviesService.getCategories().subscribe((res: any) => {
      console.log(res);
      this.categories = res;
    });
  }
}
