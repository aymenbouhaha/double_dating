import {Entity, ManyToOne, OneToMany} from "typeorm";
import {ConversationEntity} from "../conversation.entity";
import {GeneralMessage} from "./general-message";
import {MessageAttachmentEntity} from "../media/message-attachment.entity";

@Entity("message")
export class MessageEntity extends GeneralMessage{

    @ManyToOne(
        () => ConversationEntity,
        (cnv)=>cnv.messages
    )
    conversation : ConversationEntity


    @OneToMany(
        ()=>MessageAttachmentEntity,
        msgAtt=>msgAtt.message
    )
    attachment : MessageAttachmentEntity[]

}


