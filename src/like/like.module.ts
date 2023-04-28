import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {LikeEntity} from "../models/like.entity";
import {PostModule} from "../post/post.module";

@Module({
  imports : [TypeOrmModule.forFeature([LikeEntity]), PostModule],
  controllers: [LikeController],
  providers: [LikeService]
})
export class LikeModule {}
