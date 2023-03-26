import {Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CoupleEntity} from "./couple.entity";
import {ImageEntity} from "./image.entity";
import {VideoEntity} from "./video.entity";

@Entity("post")
export class PostEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    caption : string

    @CreateDateColumn()
    creationDate : Date

    @ManyToOne(
        type => CoupleEntity,
        (couple) => couple.posts
    )
    owner : CoupleEntity

    @OneToMany(
        ()=>ImageEntity,
        (img)=>img.post
    )
    images : ImageEntity[]

    @OneToMany(
        ()=>VideoEntity,
        (vd)=>vd.post
    )
    videos : VideoEntity[]




}