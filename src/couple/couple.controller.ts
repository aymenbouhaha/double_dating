import {Body, Controller, Get, InternalServerErrorException, Patch, Post, Put,UseGuards, Param,Request, ParseArrayPipe, Query } from '@nestjs/common';
import { CoupleService } from './couple.service';
import {SignUpDto} from "./dto/sign-up.dto";
import {LoginDto} from "./dto/login.dto";
import {VerifyCodeDto} from "./dto/verify-code.dto";
import {JwtAuthGuard} from "./guard/jwt-auth.guard";
import {Couple} from "../decorators/couple.decorator";
import {CoupleEntity} from "../models/couple.entity";
import { CoupleProfileDto } from './dto/coupleProfile.dto';
import { DateScheduleEntity } from 'src/models/date/date-schedule.entity';
import { RequestEntity } from 'src/models/request.entity';

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

  @Get(':username')
  async searchCoupleByUsername(@Param('username') username: string): Promise<CoupleEntity | undefined> {
    return this.coupleService.searchCoupleByUsername(username);
  }

  @Put('update')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Request() req: any): Promise<any> {
    try {
      const couple: CoupleEntity = req.user;
      const { username, password, imageUrl } = req.body;

      // Update the couple's profile information
      couple.username = username;
      couple.password = password;
      couple.imageUrl = imageUrl;

      // Save the updated couple entity
      await this.coupleService.updateCouple(couple);

      return { message: 'Profile updated successfully' };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to update profile');
    }
  }

  @Get('profiles/:id')
async getCoupleProfile(@Param('id') id: number) {
  const coupleProfile = await this.coupleService.getCoupleProfile(id);
  return coupleProfile;
}

@Get('/suggestions')
async getCoupleSuggestions(
  @Query('coupleId') coupleId: number,
  @Query('interests', ParseArrayPipe) interests: number[],
): Promise<CoupleProfileDto[]> {
  return this.coupleService.getCoupleSuggestions(coupleId, interests);
}

@Get('/received')
async getReceivedInvitations(@Query('coupleId') coupleId: number): Promise<RequestEntity[]> {
  return this.coupleService.getReceivedInvitations(coupleId);
}

@Get('/dates')
async getAllDates(@Query('coupleId') coupleId: number): Promise<DateScheduleEntity[]> {
  return this.coupleService.getAllDates(coupleId);
}

}
