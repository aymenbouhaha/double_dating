import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {PostEntity} from "./post.entity";
import {CoupleEntity} from "./couple.entity";


@Entity("like")
export class LikeEntity{

    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(
        ()=>PostEntity
    )
    post : PostEntity

    @ManyToOne(
        ()=>CoupleEntity
    )
    doer : CoupleEntity

}