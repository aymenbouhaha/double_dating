import {IsDate, IsDateString, IsNotEmpty, IsPositive} from "class-validator";

export class DateRequestSenderDto {

    @IsPositive()
    recieverId : number
    @IsNotEmpty()
    place : string

    @IsDateString( {strict : true})
    @IsNotEmpty()
    date : string


}