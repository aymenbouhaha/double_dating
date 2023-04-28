import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PostEntity} from "../models/post.entity";
import {CoupleService} from "../couple/couple.service";
import {UserNotFoundException} from "../couple/exception/user-not-found.exception";
import {PostDto} from "./dto/Post.dto";
import {Repository} from "typeorm";

@Injectable()
export class PostService {
    constructor( @InjectRepository(PostEntity) private postRepo :   Repository<PostEntity>,
                 private coupleservice : CoupleService) {
    }
    async createPost(coupleId : number, post : PostDto)
    {
        const newPost =await  this.postRepo.create(post)                 ;
        const couple  =await  this.coupleservice.findCoupleById(coupleId)   ;
        if(!couple)
            throw new UserNotFoundException()
        newPost.owner= await couple                                      ;
        //implement the whole post entity
        const posts =[newPost]                                           ;
        return this.postRepo.save(newPost)                               ;
    }

}
