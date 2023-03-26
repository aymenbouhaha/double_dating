import {Body, Controller, Post} from '@nestjs/common';
import { CoupleService } from './couple.service';
import {SignUpDto} from "./dto/sign-up.dto";
import {LoginDto} from "./dto/login.dto";

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
}
