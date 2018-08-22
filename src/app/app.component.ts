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
  nextPageToken: string;
  currentSearchTerm:string;
  videoSearchSubmit(searchValue: string){
    this._searchListService.searchFor(searchValue)
    .subscribe(
      (searchResponseData: any[]) => {
        this.vResultList = searchResponseData.items;
        //this.nextPageToken = searchResponseData.nextPageToken;
        //this.currentSearchTerm = searchValue;
      },
      error => alert(error),
      () => {
        this.searchSubmitted = true;
        console.log(this.nextPageToken);
      }
    )
  }
}
