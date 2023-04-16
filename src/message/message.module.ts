import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import {CoupleModule} from "../couple/couple.module";
import {ConversationModule} from "../conversation/conversation.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MessageEntity} from "../models/messages/message.entity";
import {FriendModule} from "../friend/friend.module";

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports : [CoupleModule, ConversationModule, TypeOrmModule.forFeature([MessageEntity]), FriendModule]
})
export class MessageModule {}
