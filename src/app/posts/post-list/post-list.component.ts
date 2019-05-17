import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '../post'
import { PostService } from '../post.service'
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Observable<Post[]>
  
  constructor(private postService: PostService, public auth: AuthService) {}

  ngOnInit() {
    this.posts = this.postService.getPosts()
    .pipe(
      map(
        actions => {return actions.map(a => {
        const data = a.payload.doc.data() as Post
        const id = a.payload.doc.id
        return { id, ...data }
        })
      })
    )
  }
  
  delete(id: string) {
    this.postService.delete(id)
  }
}
