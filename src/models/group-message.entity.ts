import {GeneralMessage} from "./general-message";
import {Entity, ManyToMany, ManyToOne, JoinTable} from "typeorm";
import {GroupConversationEntity} from "./group-conversation.entity";
import {CoupleEntity} from "./couple.entity";


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
    @JoinTable()
    seenBy : CoupleEntity[]


}