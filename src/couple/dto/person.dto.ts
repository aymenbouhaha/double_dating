import {IsDateString, IsNotEmpty, IsPhoneNumber, IsString} from "class-validator";

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

    @IsDateString()
    @IsNotEmpty()
    birthDate : Date

}