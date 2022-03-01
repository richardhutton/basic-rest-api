import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PostModel } from './posts.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}


  @Get('dummy')
  dummy(): string {
    return this.postsService.dummy()
  }


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id); 
  }

  @Get()
  findAll(): Array<PostModel> {
    return this.postsService.findAll()
  }




}




