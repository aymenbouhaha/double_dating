import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {PostEntity} from "./post.entity";

@Entity("image")
export class ImageEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column({
        unique : true
    })
    src : string

    @ManyToOne(
        ()=>PostEntity,
        (post)=>post.images
    )
    post : PostEntity

}
