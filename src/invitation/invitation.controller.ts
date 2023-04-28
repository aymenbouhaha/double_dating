import {BadRequestException, Body, Controller, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import { InvitationService } from './invitation.service';
import {JwtAuthGuard} from "../couple/guard/jwt-auth.guard";
import {SendRequestDto} from "./dto/send-request.dto";
import {Couple} from "../decorators/couple.decorator";
import {CoupleEntity} from "../models/couple.entity";
import {RequestStatus} from "../models/request.entity";
import {DateRequestSenderDto} from "../date-request/dto/date-request-sender.dto";

@UseGuards(JwtAuthGuard)
@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {
  }


  @Post("send")
  // @Couple() ????,
  sendRequest(@Couple() sender: Partial<CoupleEntity>, @Body() requestDto: SendRequestDto) {
    return this.invitationService.sendInvitation(sender, requestDto);
  }

  @Post("request/:requesTId")
  async respondToRequest
  (@Param('requestId', ParseIntPipe) requestId: number, @Body('response') response: RequestStatus) {
    return this.invitationService.respondToRequest(requestId, response);
  }


}
