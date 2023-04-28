import {IsNotEmpty, IsString} from "class-validator";

export class CommentRespondDto {

    @IsString()
    @IsNotEmpty()
    content : string

}