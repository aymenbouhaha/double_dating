import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import { MessageService } from './message.service';
import {CreateMessageDto} from "./dto/create-message.dto";
import {Couple} from "../decorators/couple.decorator";
import {CoupleEntity} from "../models/couple.entity";
import {JwtAuthGuard} from "../couple/guard/jwt-auth.guard";


@UseGuards(JwtAuthGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}


  @Post("create")
  createMessage(@Body() message : CreateMessageDto,@Couple() author : Partial<CoupleEntity>){
    return this.messageService.createMessage(author,message,[])
  }


}
