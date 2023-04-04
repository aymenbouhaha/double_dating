import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RequestEntity} from "../models/request.entity";
import {FriendModule} from "../friend/friend.module";
import {CoupleModule} from "../couple/couple.module";

@Module({
  imports : [TypeOrmModule.forFeature([RequestEntity]), FriendModule , CoupleModule],
  controllers: [InvitationController],
  providers: [InvitationService]
})
export class InvitationModule {}
