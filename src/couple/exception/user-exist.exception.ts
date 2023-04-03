import {HttpException, HttpStatus} from "@nestjs/common";


export class UserExistException extends HttpException{
    constructor() {
        super("Username or Email already exists", HttpStatus.CONFLICT);
    }
}