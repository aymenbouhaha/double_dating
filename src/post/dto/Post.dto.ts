import {IsOptional} from "class-validator";
import {GroupPictureEntity} from "../../models/media/group-picture.entity";
export class PostDto {

    @IsOptional()
    caption : string
    @IsOptional()
    images : GroupPictureEntity[]
// abscence d'entite video ??
//    @IsOptional()
//    videos : VideoEntity[]





}