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
  pageSumbitted:boolean = false;
  vResultList: any[];
  vResults: any[];
  nextPageToken: string;
  prevPageToken: string;
  currentSearchTerm:string;
  currentPageNum: number = 1;
  pageCoutArray: any = [1,2,3];
  
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
        if(!this.prevPageToken){
          this.pageSumbitted = false;
        }
        console.log('Page Token: ' + this.nextPageToken + ' -- PageSubmited: ' + this.pageSumbitted);
        console.log('Current Page Number: ' + this.currentPageNum + ' -- Page Count Array: ' + this.pageCoutArray);
      }
    )
  }
  setNextPageToken(setOrUnset: boolean, pageToken){

  }
  resetPagination(advanceRange: number){
     this.currentPageNum += advanceRange;
     this.pageCoutArray = this.pageCoutArray.map((value)=>{return value + advanceRange});
  }
}
