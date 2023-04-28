import {Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import { PostService } from './post.service';
import {PostDto} from "./dto/Post.dto";
import {Couple} from "../decorators/couple.decorator";
import {CoupleEntity} from "../models/couple.entity";
import {JwtAuthGuard} from "../couple/guard/jwt-auth.guard";
import {FilesInterceptor} from "@nestjs/platform-express";


@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}


  @Post()
  @UseInterceptors(FilesInterceptor("media"))
  async createPost(@Body() post: PostDto, @Couple() couple : Partial<CoupleEntity>,@UploadedFiles() files : Array<Express.Multer.File>)
  {
    return this.postService.createPost(couple,post,files) ;
  }


}
