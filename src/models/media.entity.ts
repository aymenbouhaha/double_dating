import { Entity, ManyToOne} from "typeorm";
import {PostEntity} from "./post.entity";

@Entity("media")
export class MediaEntity {



    @ManyToOne(
        ()=>PostEntity,
        (post)=>post.medias
    )
    post : PostEntity

}
