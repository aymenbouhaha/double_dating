import { Entity, ManyToOne} from "typeorm";
import {PostEntity} from "../post.entity";
import {BaseMedia} from "./base-media";

@Entity("media")
export class MediaEntity extends BaseMedia{



    @ManyToOne(
        ()=>PostEntity,
        (post)=>post.medias
    )
    post : PostEntity

}
