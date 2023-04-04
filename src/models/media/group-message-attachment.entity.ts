import {BaseMedia} from "./base-media";
import {Entity, ManyToOne} from "typeorm";
import {GroupMessageEntity} from "../messages/group-message.entity";

@Entity("group_message_attachment")
export class GroupMessageAttachmentEntity extends BaseMedia{

    @ManyToOne(
        ()=>GroupMessageEntity,
        (msg)=>msg.attachment
    )
    groupMessage : GroupMessageEntity

}