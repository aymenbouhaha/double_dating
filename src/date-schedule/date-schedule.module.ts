import { Module } from '@nestjs/common';
import { DateScheduleService } from './date-schedule.service';
import { DateScheduleController } from './date-schedule.controller';

@Module({
  controllers: [DateScheduleController],
  providers: [DateScheduleService]
})
export class DateScheduleModule {}
