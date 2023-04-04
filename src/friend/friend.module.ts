import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FriendEntity} from "../models/friend.entity";

@Module({
  imports : [TypeOrmModule.forFeature([FriendEntity])],
  controllers: [FriendController],
  providers: [FriendService],
  exports : [FriendService]
})
export class FriendModule {}
