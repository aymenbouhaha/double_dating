import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CoupleEntity} from "./couple.entity";


export enum NotificationType {
    friendRequest="friend_request",
    dateRequest="date_request",
    like="like",
    comment="comment",
    message="message"
}

@Entity("notification")
export class NotificationEntity{

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    content : string

    @Column({
        type : "enum",
        enum : NotificationType
    })
    type : string


    @ManyToOne(
        ()=>CoupleEntity
    )
    owner : CoupleEntity
}