import {Body, Controller, Patch, Post, UseGuards} from '@nestjs/common';
import { CoupleService } from './couple.service';
import {SignUpDto} from "./dto/sign-up.dto";
import {LoginDto} from "./dto/login.dto";
import {VerifyCodeDto} from "./dto/verify-code.dto";
import {JwtAuthGuard} from "./guard/jwt-auth.guard";
import {Couple} from "../decorators/couple.decorator";
import {CoupleEntity} from "../models/couple.entity";

@Controller('couple')
export class CoupleController {
  constructor(private readonly coupleService: CoupleService) {}


  @Post("sign-up")
  signUp(@Body() coupleData : SignUpDto){
    return this.coupleService.signUp(coupleData)
  }

  @Post("login")
  login(@Body() credentials : LoginDto){
    return this.coupleService.login(credentials)
  }

  @UseGuards(JwtAuthGuard)
  @Patch("verify")
  verifyAccount(@Couple() couple : Partial<CoupleEntity>,@Body() verifyCredentials : VerifyCodeDto){
    return this.coupleService.verifyAccount(couple,verifyCredentials)
  }
}
