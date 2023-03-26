import {Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {GroupMessageEntity} from "./group-message.entity";
import {CoupleEntity} from "./couple.entity";

@Entity("group_conversation")
export class GroupConversationEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column({
        unique : true
    })
    groupPicture : string

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


}
