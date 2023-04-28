import {Body, Controller, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import { InterestService } from './interest.service';
import {Couple} from "../decorators/couple.decorator";
import {CoupleEntity} from "../models/couple.entity";
import {ChooseInterestDto} from "./dto/choose-interest.dto";
import {JwtAuthGuard} from "../couple/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('interest')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}



  @Post("assign")
  async chooseInterests(@Couple() couple : Partial<CoupleEntity>, @Body()interestDto : ChooseInterestDto)
    {
      return await this.interestService.chooseInterests(couple,interestDto) ;
    }

}

