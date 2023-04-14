import {HttpException, HttpStatus} from "@nestjs/common";


export class NotFriendException extends HttpException{

    constructor() {
        super("Vous n'etes pas amis", HttpStatus.BAD_REQUEST);
    }
}