import {Body, Controller, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import { CommentService } from './comment.service';
import {Couple} from "../decorators/couple.decorator";
import {CoupleEntity} from "../models/couple.entity";
import {CommentRespondDto} from "./dto/comment-respond.dto";
import {JwtAuthGuard} from "../couple/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post("respond/:id")
  respondToComment(@Couple() couple: Partial<CoupleEntity>, @Param("id", ParseIntPipe) commentId : number,@Body() commentDto : CommentRespondDto){
    return this.commentService.respondToComment(couple,commentId,commentDto)
  }



}
