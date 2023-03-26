import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {PostEntity} from "./post.entity";

@Entity("video")
export class VideoEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column({
        unique : true
    })
    src : string

    @ManyToOne(
        ()=>PostEntity,
        (post)=>post.videos
    )
    post : PostEntity

}
