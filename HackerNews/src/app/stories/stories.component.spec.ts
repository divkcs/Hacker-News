import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { StoriesComponent } from './stories.component';

describe('StoriesComponent', () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigateByUrl: (arg:any, object:any) => ({}) });
    const sharedServiceStub = () => ({
      fetchStoryList: () => ({ pipe: () => ({ subscribe: (f:any) => f({}) }) }),
      fetchCommentAndStoryDetails: (id:number) => ({}),
      timeConversion: (time:any) => ({})
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StoriesComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: SharedService, useFactory: sharedServiceStub }
      ]
    });
    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
  });

  it('can load stories component', () => {
    expect(component).toBeTruthy();
  });

  it(`storyList has default value`, () => {
    expect(component.storyList).toEqual([]);
  });

  it(`results has default value`, () => {
    expect(component.results).toEqual([]);
  });

  it(`baseURL has default value`, () => {
    expect(component.baseURL).toEqual(`https://hacker-news.firebaseio.com/v0/`);
  });

  describe('ngOnInit', () => {
    it('calls expected methods', () => {
      spyOn(component, 'getStoriesFromService').and.callThrough();
      component.ngOnInit();
      expect(component.getStoriesFromService).toHaveBeenCalled();
    });
  });

  describe('getStoriesFromService', () => {
    it('calls stories api with fork join', () => {
      const sharedServiceStub: SharedService = fixture.debugElement.injector.get(
        SharedService
      );
      spyOn(sharedServiceStub, 'fetchStoryList').and.callThrough();
      spyOn(sharedServiceStub, 'fetchCommentAndStoryDetails').and.returnValue({"by":"EvgeniyZh","descendants":9,"id":27896386,"kids":[27896986,27897066,27896749,27897119,27896914],"score":70,"time":1626800941,"title":"Our lawsuit against ChessBase – Stockfish – open-source Chess Engine","type":"story","url":"https://stockfishchess.org/blog/2021/our-lawsuit-against-chessbase/"});
      component.getStoriesFromService();
      var story = sharedServiceStub.fetchCommentAndStoryDetails(27893283);
      expect(story).toEqual({"by":"EvgeniyZh","descendants":9,"id":27896386,"kids":[27896986,27897066,27896749,27897119,27896914],"score":70,"time":1626800941,"title":"Our lawsuit against ChessBase – Stockfish – open-source Chess Engine","type":"story","url":"https://stockfishchess.org/blog/2021/our-lawsuit-against-chessbase/"});
    });
  });
});
