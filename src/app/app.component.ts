import { Component } from '@angular/core';
import { SearchListService } from './search-list.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SearchListService]
  
})
export class AppComponent {
  constructor(private _searchListService: SearchListService){}
  searchSubmitted: boolean = false;
  vResultList: any[];
  vResults: any[];
  nextPageToken: string;
  prevPageToken: string;
  currentSearchTerm:string;
  
  videoSearchSubmit(searchValue: string, pageToken: string){
    this._searchListService.searchFor(searchValue, pageToken )
    .subscribe(
      (searchResponseData: any) => {
        this.vResults = searchResponseData
        this.vResultList = searchResponseData.items;
        this.nextPageToken = '&pageToken=' + searchResponseData.nextPageToken;
        this.prevPageToken = '&pageToken=' + searchResponseData.prevPageToken;
        //this.nextPageToken = searchResponseData.nextPageToken;
        this.currentSearchTerm = searchValue;
      },
      error => alert(error),
      () => {
        this.searchSubmitted = true;
        console.log(this.nextPageToken);
      }
    )
  }
  setNextPageToken(setOrUnset: boolean, pageToken){

  }
  resetSubmittedSate(){
    this.searchSubmitted = false;
    this.nextPageToken = '';
    this.prevPageToken = '';

  }
}
