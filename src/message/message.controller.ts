import {Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import { MessageService } from './message.service';
import {CreateMessageDto} from "./dto/create-message.dto";
import {Couple} from "../decorators/couple.decorator";
import {CoupleEntity} from "../models/couple.entity";
import {JwtAuthGuard} from "../couple/guard/jwt-auth.guard";
import {FilesInterceptor} from "@nestjs/platform-express";


@UseGuards(JwtAuthGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}


  @Post("create")
  @UseInterceptors(FilesInterceptor("attachement"))
  createMessage(@Body() message ,@Couple() author : Partial<CoupleEntity>,@UploadedFiles() files : Array<Express.Multer.File>){
    console.log(message)
    return this.messageService.createMessage(author,message,files)
  }


}
