import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';


export interface Story {
  id: number,
  kids: number[],
  score: number,
  by: string,
  time: number,
  title: string,
  type: string,
  url: string,
  descendants: number,
  date: string
}

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  storyList: Story[] = [];
  results = [];
  public baseURL: string = 'https://hacker-news.firebaseio.com/v0/';

  constructor(private service: SharedService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getStoriesFromService();
  }

  getStoriesFromService() {
    this.service.fetchStoryList().pipe(
      mergeMap((ids: any) =>
        forkJoin(ids.map((id: any) =>
          this.service.fetchCommentAndStoryDetails(id),
        ))),
    ).subscribe((stories: any) => {
      if (stories && stories.length > 0) {
        stories.forEach((story: any) => {
          story.time = this.service.timeConversion(story.time);
        })
        this.storyList = stories;
      }
    });
  }

  gotoComments(story: any) {
    this.router.navigateByUrl('/Comment?id=' + story.id, { state: story.kids });
  }

}
