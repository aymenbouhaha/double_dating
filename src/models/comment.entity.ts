import {Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CoupleEntity} from "./couple.entity";
import {PostEntity} from "./post.entity";

@Entity("comment")
export class CommentEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    content : string

    @CreateDateColumn()
    creationDate : Date

    @ManyToOne(
        () => CoupleEntity,
        (couple)=>couple.comments
    )
    owner : CoupleEntity

    @ManyToOne(
        ()=>PostEntity,
    )
    post : PostEntity

    @ManyToMany(
        ()=>CommentEntity
    )
    @JoinTable({
        name : "responses"
    })
    response: CommentEntity[]

}
