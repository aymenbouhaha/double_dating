import {IsDateString, IsNotEmpty, IsPhoneNumber, IsString} from "class-validator";
import {Type} from "class-transformer";

export class PersonDto {

    @IsString()
    @IsNotEmpty()
    firstName : string

    @IsString()
    @IsNotEmpty()
    lastName : string

    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber : string

    @IsDateString({strict : true})
    @IsNotEmpty()
    birthDate : string

}