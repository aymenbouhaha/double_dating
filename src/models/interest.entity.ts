import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {CoupleEntity} from "./couple.entity";

@Entity("interest")
export class InterestEntity {

    @PrimaryGeneratedColumn()
    id : number


    @Column({
        unique : true
    })
    name : string

    @ManyToMany(
        ()=>CoupleEntity,
        (cpl)=>cpl.interest
    )
    couples : CoupleEntity[]


}
