import { Component } from '@angular/core';
import { SearchListService } from './search-list.service';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SearchListService],
  animations: [
    trigger('detailedVideo', [
      state('in', style({ transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(100%)'}),
        animate(400)
      ]),
      transition('in => out', [
        animate(400, style({transform: 'translateX(100%)'}))
      ]),
      transition('* => in', [
        animate(400, style({transform: 'translateX(0)'}))
      ]),
      transition('* => void', [
        style({transform: 'translateX(100%)'}),
        animate(400)
      ])
    ])
  ]
  
})
export class AppComponent {
  constructor(private _searchListService: SearchListService){}
  searchSubmitted: boolean = false;
  pageSumbitted:boolean = false;
  vResultList: any[];
  vResults: any[];

  // Para a paginação
  currentSearchTerm:string;
  nextPageToken: string;
  prevPageToken: string;
  currentPageNum: number = 1;
  pageCoutArray: any = [1,2,3];
  maxPageNumber: number;
  public totalSearchResults: number;

  // Para Video Detalhado
  detailedVideo: string;
  currVideoObject: any;
  
  
  videoSearchSubmit(searchValue: string, pageToken: string){
    this._searchListService.searchFor(searchValue, pageToken )
    .subscribe(
      (searchResponseData: any) => {
        this.vResults = searchResponseData
        this.vResultList = searchResponseData.items;
        this.nextPageToken = '&pageToken=' + searchResponseData.nextPageToken;
        this.prevPageToken = '&pageToken=' + searchResponseData.prevPageToken;
        this.currentSearchTerm = searchValue;
        this.totalSearchResults = searchResponseData.pageInfo.totalResults;
      },
      error => {console.log('Error Message: ' + error.message)},
      () => {
        this.searchSubmitted = true;
        if(!this.prevPageToken){
          this.pageSumbitted = false;
          
        }
        //console.log('Page Token: ' + this.nextPageToken + ' -- PageSubmited: ' + this.pageSumbitted);
        //console.log('Current Page Number: ' + this.currentPageNum + ' -- Page Count Array: ' + this.pageCoutArray);

        this.setTotalPagesCount(this.totalSearchResults);
        //console.log('Total Search Result: ' + this.totalSearchResults + ' -- Maximum page number: ' + this.maxPageNumber);
      }
    )
  }
  resetPagination(advanceRange: number){
    if((this.currentPageNum + advanceRange) > 0 && (this.currentPageNum + advanceRange) <= this.maxPageNumber){
      this.currentPageNum += advanceRange;
      this.pageCoutArray = this.pageCoutArray.map((value)=>{return value + advanceRange});
    }
  }
  setNotDetailedView(notDetailedViewVal: string){
    this.detailedVideo = notDetailedViewVal;
    console.log('Valor de não detalhado: ' + notDetailedViewVal);
  }
  setTotalPagesCount(totalSearchResults: number){
    let pageNumberRemainder = totalSearchResults % 6;
    let pageNumber = Math.floor(totalSearchResults / 6);
    if( pageNumberRemainder > 0 )
      this.maxPageNumber = pageNumber + 1;
    else if(pageNumberRemainder = 0)
      this.maxPageNumber = pageNumber;
  }
  showDetailedVideo(videoID: string){
    this._searchListService.retrieveVideoInfo(videoID)
    .subscribe(
      (currVideoResponseData:any) =>{
        this.currVideoObject = currVideoResponseData.items[0];
      },
      error => {console.log('Error Message: ' + error.message)},
      () => {
        //console.log(JSON.stringify(this.currVideoObject));
        this.detailedVideo = 'in';
      },
      
    )
  }
}
