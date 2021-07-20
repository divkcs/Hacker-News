import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { SharedService } from './shared.service';


describe('SharedService', () => {
  let service: SharedService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SharedService]
    });
    service = TestBed.inject(SharedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchStoryList', () => {
    it('can retrieve top stories from the API', () => {
      const storyList = [27867941, 27866965, 27865086, 27866344, 27868741];
      service.fetchStoryList().subscribe((stories: any) => {
        expect(stories.length).toBe(5);
        expect(stories).toEqual(storyList);
      });
      const request = httpMock.expectOne(`${service.baseURL}/topstories.json?orderBy="$key"&limitToFirst=5`);
      expect(request.request.method).toBe('GET');
      request.flush(storyList);
    });
  });
});
