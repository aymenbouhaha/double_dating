import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {CoupleEntity} from "./couple.entity";

@Entity("friend")
export class FriendEntity {

    @PrimaryColumn({
        name : "couple1_id"
    })
    coupleOneId : number

    @PrimaryColumn({
        name : "couple2_id"
    })
    coupleTwoId : number


    @ManyToOne(
        ()=>CoupleEntity
    )
    @JoinColumn({
        name: "couple1_id"
    })
    coupleOne : CoupleEntity


    @ManyToOne(
        ()=>CoupleEntity
    )
    @JoinColumn({
        name: "couple2_id"
    })
    coupleTwo : CoupleEntity

    @Column()
    test : string

    @CreateDateColumn()
    creation : Date

    @UpdateDateColumn()
    update : Date

}