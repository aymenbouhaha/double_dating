import { Module } from '@nestjs/common';
import { CoupleService } from './couple.service';
import { CoupleController } from './couple.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import {CoupleEntity} from "../models/couple.entity";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./strategy/passport-jwt.strategy";
import {PersonEntity} from "../models/person.entity";
import { MailService } from './mail/mail.service';

dotenv.config()
@Module({
  imports: [
    TypeOrmModule.forFeature([CoupleEntity , PersonEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: 3600*4,
      },
    }),
  ],
  controllers: [CoupleController],
  providers: [CoupleService, JwtStrategy, MailService],
  exports : [CoupleService]
})
export class CoupleModule {}
