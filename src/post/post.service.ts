import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PostEntity} from "../models/post.entity";
import {Repository} from "typeorm";

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(PostEntity)
        private postRepo : Repository<PostEntity>
    ) {
    }


    async findPostById(id : number){
        return await this.postRepo.findOne({
            where : {id : id},
            relations : ["owner"]
        })
    }


}
