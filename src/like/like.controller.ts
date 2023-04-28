import {Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import { LikeService } from './like.service';
import {Couple} from "../decorators/couple.decorator";
import {CoupleEntity} from "../models/couple.entity";
import {JwtAuthGuard} from "../couple/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}


  @Post(":id")
  likePost(@Couple() couple : Partial<CoupleEntity>,@Param("id", ParseIntPipe)postId : number){
    return this.likeService.likePost(couple,postId)
  }

  @Delete(":id")
  dislikePost(@Couple() couple : Partial<CoupleEntity>,@Param("id", ParseIntPipe)postId : number){
    return this.likeService.dislikePost(couple,postId)
  }

  @Get(":id")
  getPostLikes(@Param("id", ParseIntPipe)postId : number){
    return this.likeService.findLikesByPost(postId)
  }

}
