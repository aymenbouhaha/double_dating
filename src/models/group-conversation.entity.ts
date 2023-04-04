import {Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {GroupMessageEntity} from "./messages/group-message.entity";
import {CoupleEntity} from "./couple.entity";
import {GroupPictureEntity} from "./media/group-picture.entity";

@Entity("group_conversation")
export class GroupConversationEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @OneToMany(
        ()=>GroupMessageEntity,
        (msg)=>msg.groupConversation
    )
    messages : GroupMessageEntity[]


    @ManyToMany(
        ()=>CoupleEntity,
        (cpl)=>cpl.groupConversation
    )
    participants : CoupleEntity[]

    @OneToOne(
        ()=>GroupMessageEntity
    )
    @JoinColumn()
    lastMessage : GroupMessageEntity

    @OneToOne(
        ()=>GroupPictureEntity
    )
    groupPicture : GroupPictureEntity
}
