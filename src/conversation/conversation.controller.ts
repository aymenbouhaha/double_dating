import {Controller, Get, Param, ParseIntPipe, UseGuards} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import {Couple} from "../decorators/couple.decorator";
import {CoupleEntity} from "../models/couple.entity";
import {JwtAuthGuard} from "../couple/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}


  @Get()
  getConversations(@Couple() couple : Partial<CoupleEntity>){
    return this.conversationService.getConversations(couple)
  }

  @Get(':id')
  getConversationWithMessages(@Couple() couple : Partial<CoupleEntity> ,@Param("id", ParseIntPipe) secondCoupleId : number){
    return this.conversationService.getConversationWithMessages(couple,secondCoupleId)
  }



}
