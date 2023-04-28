import {Body, Controller, Patch, Post, UseGuards} from '@nestjs/common';
import { DateRequestService } from './date-request.service';
import {Couple} from "../decorators/couple.decorator";
import {CoupleEntity} from "../models/couple.entity";
import {DateRequestDto} from "./dto/date-request.dto";
import {JwtAuthGuard} from "../couple/guard/jwt-auth.guard";
import {DateRequestSenderDto} from "./dto/date-request-sender.dto";
import Pool from "mysql2/typings/mysql/lib/Pool";

@UseGuards(JwtAuthGuard)
@Controller('date-request')
export class DateRequestController {
  constructor(private readonly dateRequestService: DateRequestService) {}

  @Post("send")
  async SendDateRequest(@Couple() sender : Partial<CoupleEntity> , @Body() dateRequestDto : DateRequestSenderDto ) {
  return await this.dateRequestService.SendDateRequest(sender,dateRequestDto) ;
  }

  @Patch("accept")
  acceptDateRequest(@Couple() reciever : Partial<CoupleEntity>,@Body() dateRequestDto : DateRequestDto){
    return this.dateRequestService.acceptDateRequest(reciever,dateRequestDto)
  }

  @Patch("decline")
  declineDateRequest(@Couple() reciever : Partial<CoupleEntity>,@Body() dateRequestDto : DateRequestDto){
    return this.dateRequestService.declineDateRequest(reciever,dateRequestDto)
  }

}
