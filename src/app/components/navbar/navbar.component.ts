import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MoviesComponent } from '../movies/movies.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchForm = new FormGroup({
    'searchInput': new FormControl('')
  })

  constructor(private findMovies: MoviesComponent) { }
  ngOnInit() {
  }
  searchMovies(){
    return this.findMovies.getSearchedMovies(this.searchForm.value.searchInput);
  }

}
