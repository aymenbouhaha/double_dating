import {Entity, ManyToOne} from "typeorm";
import {BaseMedia} from "./base-media";
import {MessageEntity} from "./message.entity";

@Entity("message_attachment")
export class MessageAttachmentEntity extends BaseMedia{

    @ManyToOne(
        ()=>MessageEntity,
        (msg)=>msg.attachment
    )
    message : MessageEntity
}