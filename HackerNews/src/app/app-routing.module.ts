import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentListComponent } from './comment-list/comment-list.component';
import { StoriesComponent } from './stories/stories.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'TopStories', pathMatch: 'full'
  },
  {
    path: 'TopStories', component: StoriesComponent
  },
  { 
    path: 'Comment', component: CommentListComponent 
  },
  {
    path: '**', redirectTo: 'TopStories'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
