import { Module } from '@nestjs/common';
import { DateRequestService } from './date-request.service';
import { DateRequestController } from './date-request.controller';

@Module({
  controllers: [DateRequestController],
  providers: [DateRequestService]
})
export class DateRequestModule {}
