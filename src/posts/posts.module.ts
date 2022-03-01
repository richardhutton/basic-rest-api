import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

// The exports will make this service accessible outside of the module 

@Module({

  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
