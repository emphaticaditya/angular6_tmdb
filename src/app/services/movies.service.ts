import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiKey:string = "5ab5df3660e0094fe12a4269e754850d";
  private baseUrl:string = "https://api.themoviedb.org/";
  private getMoviesUrl:string = `3/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=`;
  private searchMoviesUrl:string = `3/search/movie?api_key=${this.apiKey}&language=en-US&query=`;
  constructor(private httpClient: HttpClient) { }

  getTopRatedMovies(page:number){
    return this.httpClient.get<any>(this.baseUrl + this.getMoviesUrl + page);
  }
  searchMovies(movie:string, page:number){
    return this.httpClient.get<any>(this.baseUrl + this.searchMoviesUrl + movie + '&page=' + page +'&include_adult=false');
  }
}
