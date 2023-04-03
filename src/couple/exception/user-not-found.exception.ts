import {HttpException, HttpStatus} from "@nestjs/common";

export class UserNotFoundException extends HttpException{

    constructor() {
        super("Compte introuvable", HttpStatus.NOT_FOUND);
    }
}