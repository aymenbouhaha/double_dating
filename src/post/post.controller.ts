import {Body, Controller, Param, Post} from '@nestjs/common';
import { PostService } from './post.service';
import {PostDto} from "./dto/Post.dto";

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post('createPost/:id')
  async createPost(@Param('id') coupleId: number ,
                   @Body() post: PostDto)
  {
    return this.postService.createPost(coupleId, post) ;
  }
}
