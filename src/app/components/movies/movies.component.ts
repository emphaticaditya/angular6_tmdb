import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  private baseUrlImages:string = "http://image.tmdb.org/t/p/w185/";
  private page:number = 1;
  private movies:Array<any>;
  private totalPages:Array<number>;
  private searchedMovie:string;
  private isSearchUsed:boolean = false;
  constructor(private getMoviesService: MoviesService) { }
  
  ngOnInit() {
    this.getMovies();
  }

  // function to get movie details
  getMovies(){
    this.getMoviesService.getTopRatedMovies(this.page).subscribe(
      data=>{
        this.movies = data['results'];
        this.totalPages = new Array(data['total_pages']);
      },
      (error)=>{
        console.log(error.error.message);
      }
    );
  }
  //function for getting searched movies
  getSearchedMovies(movie:string){
    this.searchedMovie = movie;
    this.getMoviesService.searchMovies(movie, this.page).subscribe((res:any)=>{
      this.movies = res['results'];
        this.totalPages = new Array(res['total_pages']);
        this.isSearchUsed = true;
    },(error)=>{
        console.log(error.error.message);
      }
    )
  }

  //pagination event function
  changePage(i, event:any){
    event.preventDefault();
    this.page = i+1;
    this.isSearchUsed ? this.getSearchedMovies(this.searchedMovie) : this.getMovies();
  }

}
