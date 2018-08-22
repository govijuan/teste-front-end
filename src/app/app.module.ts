import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { VideoSearchListComponent } from './video-search-list/video-search-list.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchListService } from './search-list.service';

@NgModule({
  declarations: [
    AppComponent,
    VideoSearchListComponent,
    SearchFormComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule
  ],
  providers: [SearchListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
