import {HttpException, HttpStatus} from "@nestjs/common";


export class PasswordErrorException extends HttpException{
    constructor() {
        super("Mot De Passe Erroné", HttpStatus.CONFLICT);
    }
}