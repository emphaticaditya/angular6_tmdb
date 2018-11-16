import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { debug } from 'util';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  private baseUrlImages:string = "http://image.tmdb.org/t/p/w185/";
  private page:number = 1;
  private movies:Array<any>;
  public totalPages:Array<number> = new Array();
  private avail_pages:number;
  private searchedMovie:string;
  private isSearchUsed:boolean = false;
  private pageControlFlag:boolean = false;
  private showPrevNext:boolean = false;
  private currentPage:number;
  constructor(private getMoviesService: MoviesService) { }
  
  ngOnInit() {
    this.getMovies();
  }
  // function to get movie details
  getMovies(){
    if(this.page > 1 && this.isSearchUsed){
      this.page = 1;
    }
    if(this.page < 1){
      this.page = 1;
      return;
    }
    this.getMoviesService.getTopRatedMovies(this.page).subscribe(
      data=>{
        this.movies = data['results'];
        this.currentPage = data['page'];
        if(this.totalPages.length==0){
           this.avail_pages = data['total_pages'];
          for(var i=1; i<=this.avail_pages; i++){
            this.totalPages.push(i)
          }
          if(this.totalPages.length > 10){
            this.showPrevNext = true;
            this.totalPages.splice(10, this.totalPages.length);
          }
        }
        this.isSearchUsed = false;
        
      },
      (error)=>{
        console.log(error.error.message);
      }
    );
  }
  
  //function for getting searched movies
  getSearchedMovies(movie:string){
    this.searchedMovie = movie;
    if(this.page < 1){
      this.page = 1;
      return;
    }
    if(this.page > 1 && !this.pageControlFlag){
      this.page = 1;
    }
    else if(this.page > 1 && !this.isSearchUsed){
      this.page = 1;
      this.totalPages = new Array();
    }
    this.pageControlFlag = false;
    this.getMoviesService.searchMovies(movie, this.page).subscribe((res:any)=>{
      this.movies = res['results'];
      this.currentPage = res['page'];

        if(this.totalPages.length==0){
          this.avail_pages = res['total_pages'];
          for(var i=1; i<=this.avail_pages; i++){
            this.totalPages.push(i)
          }
          if(this.totalPages.length > 10){
            this.showPrevNext = true;
            this.totalPages.splice(10, this.totalPages.length);
          }
        }
        this.isSearchUsed = true;
    },(error)=>{
        console.log(error.error.message);
      }
    )
  }
  
  // Reduce Pagination Numbers
  reducePageNumber(i, event:any, pagination:string){
    if(this.avail_pages == this.page && pagination=="next"){
      return;
    }
    this.changePage(i, event);
    switch(pagination){
      case "next":
      if(i>5){
        for(var j=0; j<this.totalPages.length; j++){
          this.totalPages[j] = this.totalPages[j]+1;
        }
      }
      break;
      case "prev":
      if(i>1){
        for(var j=0; j<this.totalPages.length; j++){
          if(this.totalPages[j]<2){
            return;
          }
          this.totalPages[j] = this.totalPages[j]-1;
        }
      }
      break;
    }
    return this.totalPages;
  }

  //pagination event function
  changePage(i, event:any){
    event.preventDefault();
    this.pageControlFlag = true;
    this.page = i+1;
    this.isSearchUsed ? this.getSearchedMovies(this.searchedMovie) : this.getMovies();
  }

}
