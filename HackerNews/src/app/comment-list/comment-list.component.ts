import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../service/shared.service';


@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  commentIDs: any = [];
  commentList: any = [];

  constructor(private route: ActivatedRoute, private service: SharedService,private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.commentIDs = history.state;
    });
    this.getCommentsList();
  }


  getCommentsList() {
    if (this.commentIDs != null && this.commentIDs != undefined && this.commentIDs.navigationId != 1) {
      this.commentIDs = (Object.values(this.commentIDs)).slice(0, 3);
      this.commentIDs.forEach((element: any) => {
        if (element != 2) {
          this.service.fetchCommentAndStoryDetails(element).subscribe((comment: any) => {
            if (comment.type == 'comment') {
              comment.time = this.service.timeConversion(comment.time);
              this.commentList.push(comment);
            }
          },
            (error: any) => {
              console.log(error);
            });
        }
      });
    }
    else{
      this.router.navigate(['TopStories']);
    }
  }


}