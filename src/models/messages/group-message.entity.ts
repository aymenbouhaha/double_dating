import {GeneralMessage} from "./general-message";
import {Entity, ManyToMany, ManyToOne, JoinTable, OneToMany} from "typeorm";
import {GroupConversationEntity} from "../group-conversation.entity";
import {CoupleEntity} from "../couple.entity";
import {GroupMessageAttachmentEntity} from "../media/group-message-attachment.entity";


@Entity("group_message")
export class GroupMessageEntity extends GeneralMessage{


    @ManyToOne(
        ()=>GroupConversationEntity,
        (conv)=>conv.messages
    )
    groupConversation : GroupConversationEntity


    @ManyToMany(
        ()=>CoupleEntity
    )
    @JoinTable({
        name : "seen_by"
    })
    seenBy : CoupleEntity[]

    @OneToMany(
        ()=>GroupMessageAttachmentEntity,
        attch=>attch.groupMessage
    )
    attachment : GroupMessageAttachmentEntity[]


}