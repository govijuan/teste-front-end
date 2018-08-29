import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoListSliderComponent } from './video-list-slider.component';

describe('VideoListSliderComponent', () => {
  let component: VideoListSliderComponent;
  let fixture: ComponentFixture<VideoListSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoListSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoListSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
