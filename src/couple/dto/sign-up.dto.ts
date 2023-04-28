import {PersonDto} from "./person.dto";
import {IsDateString, IsEmail, IsNotEmpty, IsNotEmptyObject, IsString} from "class-validator";
import {Type} from "class-transformer";

export class SignUpDto {

    @IsEmail()
    email : string

    @IsString()
    @IsNotEmpty()
    username : string

    @IsString()
    @IsNotEmpty()
    password : string

    @IsDateString({strict : true})
    @IsNotEmpty()
    anniversary : string

    @IsNotEmptyObject()
    firstPartner : PersonDto

    @IsNotEmptyObject()
    secondPartner : PersonDto

}