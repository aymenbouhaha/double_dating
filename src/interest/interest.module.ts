import { Module } from '@nestjs/common';
import { InterestService } from './interest.service';
import { InterestController } from './interest.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CoupleEntity} from "../models/couple.entity";
import {PersonEntity} from "../models/person.entity";
import {CoupleModule} from "../couple/couple.module";
import {InterestEntity} from "../models/interest.entity";

@Module({
  imports : [ TypeOrmModule.forFeature([InterestEntity]),CoupleModule] ,
  controllers: [InterestController],
  providers: [InterestService]
})
export class InterestModule {}
