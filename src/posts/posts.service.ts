import { Injectable } from '@nestjs/common';
import { PostModel } from './posts.interface';

@Injectable()
export class PostsService {
  private posts: Array<PostModel> = [];

  constructor() {
      this.posts.push({
        id: 1,
        date: new Date(),
        title: 'a post',
        body: 'body',
        category: 'skate', 
      }, 
      {
        id: 2,
        date: new Date(),
        title: 'second post',
        body: 'second body',
        category: 'skate', 
        
      })
  }

  
  public findAll(): Array<PostModel> {
    return this.posts;
  }

  public findOne(id: number): PostModel {
    return this.posts[id]
  }

  public dummy(): string {
    return 'dummy'
  }

}
