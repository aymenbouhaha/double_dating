import { Module } from '@nestjs/common';
import { InterestService } from './interest.service';
import { InterestController } from './interest.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {InterestEntity} from "../models/interest.entity";
import {CoupleModule} from "../couple/couple.module";

@Module({
  imports : [ TypeOrmModule.forFeature([InterestEntity]),CoupleModule] ,
  controllers: [InterestController],
  providers: [InterestService]
})
export class InterestModule {}
