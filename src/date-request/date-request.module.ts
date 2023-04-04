import { Module } from '@nestjs/common';
import { DateRequestService } from './date-request.service';
import { DateRequestController } from './date-request.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DateRequestEntity} from "../models/date/date-request.entity";
import {CoupleModule} from "../couple/couple.module";

@Module({
  imports : [TypeOrmModule.forFeature([DateRequestEntity]), CoupleModule],
  controllers: [DateRequestController],
  providers: [DateRequestService]
})
export class DateRequestModule {}
