import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchListService {
  private _baseUrl: string = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=video&q=';
  private _apiKeyEndpoint: string = '&maxResults=6&key=AIzaSyCnudY3zFXadYcuMKinkmoi2xWo8gcl_X8'; 
  constructor(private http: HttpClient) { }
  searchFor(searchTerm: string): Observable<any> {
    return this.http.get(this._baseUrl + searchTerm + this._apiKeyEndpoint);
  }
}
