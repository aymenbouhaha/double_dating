import {PersonDto} from "./person.dto";
import {IsDateString, IsEmail, IsNotEmpty, IsNotEmptyObject, IsString} from "class-validator";

export class SignUpDto {

    @IsEmail()
    email : string

    @IsString()
    @IsNotEmpty()
    username : string

    @IsString()
    @IsNotEmpty()
    password : string

    @IsDateString()
    @IsNotEmpty()
    anniversary : Date

    @IsNotEmptyObject()
    firstPartner : PersonDto

    @IsNotEmptyObject()
    secondPartner : PersonDto

}