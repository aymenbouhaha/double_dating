import { Controller } from '@nestjs/common';
import { DateScheduleService } from './date-schedule.service';

@Controller('date-schedule')
export class DateScheduleController {
  constructor(private readonly dateScheduleService: DateScheduleService) {}
}
