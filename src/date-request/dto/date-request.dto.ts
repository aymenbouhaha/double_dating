import {IsDate, IsDateString, IsNotEmpty, IsPositive} from "class-validator";

export class DateRequestDto {

    @IsPositive()
    senderId : number

    @IsNotEmpty()
    place : string

    @IsDateString()
    date : Date


}