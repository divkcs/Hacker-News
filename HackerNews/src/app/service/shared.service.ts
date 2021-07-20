import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public baseURL: string = 'https://hacker-news.firebaseio.com/v0/';

  constructor(private http: HttpClient) { }

  fetchStoryList() {
    return this.http.get(`${this.baseURL}/topstories.json?orderBy="$key"&limitToFirst=5`);
  }

  fetchCommentAndStoryDetails(id: number): any {
    return this.http.get(`${this.baseURL}/item/` + id + '.json');
  }

  timeConversion(time: any): any {
    return moment(time * 1000).fromNow();
  }

}
