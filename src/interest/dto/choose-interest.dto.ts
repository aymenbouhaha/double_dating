import {ArrayMinSize, IsArray} from "class-validator";

export class ChooseInterestDto {

    @IsArray()
    @ArrayMinSize(3)
    interestNames : string[]

}