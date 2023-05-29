import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import { InvitationService } from './invitation.service';
import {JwtAuthGuard} from "../couple/guard/jwt-auth.guard";
import {SendRequestDto} from "./dto/send-request.dto";
import {Couple} from "../decorators/couple.decorator";
import {CoupleEntity} from "../models/couple.entity";

@UseGuards(JwtAuthGuard)
@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}



  @Post("send")
  sendRequest(@Couple() sender: Partial<CoupleEntity> ,@Body() requestDto : SendRequestDto){
    return this.invitationService.sendInvitation(sender,requestDto)
  }

}
