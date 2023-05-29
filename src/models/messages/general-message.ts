import {Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CoupleEntity} from "../couple.entity";

export enum MessageStatus {
    seen = "seen",
    unseen = "unseen"

}

export abstract class GeneralMessage {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    content : string

    @Column(
        {
            type : "enum",
            enum : MessageStatus,
            default : MessageStatus.unseen
        }
    )
    status : string


    @CreateDateColumn()
    creationDate : Date

    @ManyToOne(
        () => CoupleEntity
    )
    author : CoupleEntity

}