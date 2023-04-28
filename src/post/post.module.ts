import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import {PostEntity} from "../models/post.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CoupleService} from "../couple/couple.service";
import {CoupleModule} from "../couple/couple.module";

@Module({
  imports : [TypeOrmModule.forFeature([PostEntity]),CoupleModule] ,
  controllers: [PostController],
  providers: [PostService],
  exports : [PostService]
})
export class PostModule {}
