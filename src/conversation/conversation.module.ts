import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConversationEntity} from "../models/conversation.entity";
import {CoupleModule} from "../couple/couple.module";

@Module({
  imports : [TypeOrmModule.forFeature([ConversationEntity]),CoupleModule],
  controllers: [ConversationController],
  providers: [ConversationService],
  exports : [ConversationService]
})
export class ConversationModule {}
