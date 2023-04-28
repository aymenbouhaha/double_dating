import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CoupleEntity} from "./couple.entity";
import {MediaEntity} from "./media/media.entity";

@Entity("post")
export class PostEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    caption : string

    @CreateDateColumn()
    creationDate : Date

    @ManyToOne(
        () => CoupleEntity,
        (couple) => couple.posts
    )
    owner : CoupleEntity

    @OneToMany(
        ()=>MediaEntity,
        (img)=>img.post,
        {
            cascade: true
        }
    )
    medias : MediaEntity[]




}