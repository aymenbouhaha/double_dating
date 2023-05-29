import { IsNumber, IsString, IsEmail, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { InterestEntity } from '../../models/interest.entity';
import { PostEntity } from '../../models//post.entity';

export class CoupleProfileDto {
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => InterestEntity)
  interests: InterestEntity[];

  @IsNumber()
  numberOfFriends: number;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PostEntity)
  posts: PostEntity[];

}
