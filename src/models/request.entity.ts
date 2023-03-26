import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CoupleEntity} from "./couple.entity";

export enum RequestStatus {
    accepted = "accepted",
    pending = "pending",
    declined = "declined"
}


@Entity("request")
export class RequestEntity {


    @PrimaryGeneratedColumn()
    id : number


    @Column({
        type : "enum",
        enum : RequestStatus,
        default : RequestStatus.pending
    })
    status : string


    @ManyToOne(
        ()=>CoupleEntity
    )
    sender : CoupleEntity

    @ManyToOne(
        ()=>CoupleEntity
    )
    reciever : CoupleEntity

}
