import {IsNotEmpty, IsPositive} from "class-validator";

export class SendRequestDto {

    @IsNotEmpty()
    @IsPositive()
    recieverId : number
}