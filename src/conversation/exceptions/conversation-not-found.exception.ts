import {HttpException, HttpStatus} from "@nestjs/common";


export class ConversationNotFoundException extends HttpException{

    constructor() {
        super("La Conversation n'existe pas", HttpStatus.NOT_FOUND);
    }
}