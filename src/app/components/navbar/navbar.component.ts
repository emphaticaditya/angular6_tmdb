import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesComponent } from '../movies/movies.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  //searchForm: FormGroup;
  searchForm = new FormGroup({
    'searchInput': new FormControl('')
  })

  constructor(private findMovies: MoviesComponent, private router: Router) { }
  ngOnInit() {
  }
  searchMovies(){
    console.log(this.searchForm.value);
    //this.router.navigateByUrl('/search');
   return this.findMovies.getSearchedMovies(this.searchForm.value.searchInput);
  }

}
