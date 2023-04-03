import {HttpException, HttpStatus} from "@nestjs/common";


export class VerificationFailedException extends HttpException{
    constructor(message : string , errorType : HttpStatus) {
        super(message, errorType);
    }
}