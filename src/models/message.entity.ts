import {Entity, ManyToOne} from "typeorm";
import {ConversationEntity} from "./conversation.entity";
import {GeneralMessage} from "./general-message";

@Entity("message")
export class MessageEntity extends GeneralMessage{

    @ManyToOne(
        () => ConversationEntity,
        (cnv)=>cnv.messages
    )
    conversation : ConversationEntity



}


