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
  searchSubmitted:any = 'inactive';
  vResultList: any[];
  videoSearchSubmit(searchValue: string){
    //console.log(searchValue);
    this._searchListService.searchFor(searchValue)
    .subscribe(
      (searchResponseData: any[]) => {
        this.vResultList = searchResponseData.items;
      },
      error => alert(error),
      () => {
        console.log(JSON.stringify(this.vResultList))
      }
    )
  }
}
