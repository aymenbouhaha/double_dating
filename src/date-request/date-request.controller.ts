import { Controller } from '@nestjs/common';
import { DateRequestService } from './date-request.service';

@Controller('date-request')
export class DateRequestController {
  constructor(private readonly dateRequestService: DateRequestService) {}
}
