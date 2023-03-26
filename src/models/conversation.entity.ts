import {Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {CoupleEntity} from "./couple.entity";
import {MessageEntity} from "./message.entity";

@Entity("conversation")
export class ConversationEntity {

    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(
        () => CoupleEntity,

    )
    author : CoupleEntity

    @ManyToOne(
        () => CoupleEntity,
    )
    recipient : CoupleEntity

    @OneToOne(
        () => MessageEntity
    )
    @JoinColumn()
    lastMessage : MessageEntity

    @OneToMany(
        ()=>MessageEntity,
        (msg)=>msg.conversation
    )
    messages : MessageEntity[]


}
