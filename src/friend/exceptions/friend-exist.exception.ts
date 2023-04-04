import {HttpException, HttpStatus} from "@nestjs/common";


export class FriendExistException extends HttpException{

    constructor() {
        super("Vous etes deja amis", HttpStatus.BAD_REQUEST);
    }
}