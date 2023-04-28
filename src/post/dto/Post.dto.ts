import {IsNotEmpty, IsOptional, IsString} from "class-validator";
import {GroupPictureEntity} from "../../models/media/group-picture.entity";
export class PostDto {

    @IsString()
    @IsNotEmpty()
    caption : string

}