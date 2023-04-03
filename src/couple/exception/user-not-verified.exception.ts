import {HttpException, HttpStatus} from "@nestjs/common";

export class UserNotVerifiedException extends HttpException{

    constructor() {
        super("Le compte n'est pas verifié veuillez consulter votre email", HttpStatus.BAD_REQUEST);
    }

}