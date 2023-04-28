import {HttpException, HttpStatus} from "@nestjs/common";


export class InterestNotFoundException extends HttpException{
    constructor() {
        super("Interest Not Found", HttpStatus.NOT_FOUND);
    }
}