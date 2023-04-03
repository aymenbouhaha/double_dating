import {HttpException, HttpStatus} from "@nestjs/common";


export class EmailNotSentException extends HttpException{
    constructor() {
        super("Email was not sent", HttpStatus.GATEWAY_TIMEOUT);
    }
}