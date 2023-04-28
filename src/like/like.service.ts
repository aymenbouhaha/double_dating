import {BadRequestException, ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {LikeEntity} from "../models/like.entity";
import {Repository} from "typeorm";
import {CoupleEntity} from "../models/couple.entity";
import {PostService} from "../post/post.service";
import {PostNotFoundException} from "../post/exceptions/post-not-found.exception";
import {EventEmitter2} from "@nestjs/event-emitter";
import {LikePostPayload} from "../gateway/event-payload/event-payload.interfaces";
import {PostEntity} from "../models/post.entity";

@Injectable()
export class LikeService {

    constructor(
        @InjectRepository(LikeEntity)
        private likeRepo : Repository<LikeEntity>,
        private postService : PostService,
        private eventEmitter: EventEmitter2
    ) {
    }

    async likePost(doer : Partial<CoupleEntity>, postId : number){
        const post= await this.postService.findPostById(postId)
        if (!post){
            throw new PostNotFoundException()
        }
        const existingLike= await this.findLikeByPostAndDoer(doer,post)
        if (existingLike){
            throw new BadRequestException("You have already liked the post")
        }
        const like=this.likeRepo.create({
            doer : doer,
            post : post
        })
        try {
            const addedLike=await this.likeRepo.save(like)
            const payload : LikePostPayload={
                doer : addedLike.doer,
                post : addedLike.post
            }
            this.eventEmitter.emit("like.add",payload)
            return addedLike
        }catch (e) {
            console.log(e)
            throw new ConflictException("Error Occured")
        }
    }

    async dislikePost(doer : Partial<CoupleEntity>, postId : number){
        const post= await this.postService.findPostById(postId)
        if (!post){
            throw new PostNotFoundException()
        }
        try {
            const deleted=await this.likeRepo.delete({
                doer : doer,
                post : post
            })
            const payload : LikePostPayload={
                doer : doer,
                post : post
            }
            this.eventEmitter.emit("like.delete",payload)
        }catch (e){
            throw new ConflictException("Error Occured")
        }
    }

    async findLikesByPost(postId: number){
        const post= await this.postService.findPostById(postId)
        if (!post){
            throw new PostNotFoundException()
        }
        return await this.likeRepo.findAndCount({
            where : {
                post : post
            },
            relations : ["doer"]
        })
    }


    async findLikeByPostAndDoer(doer : Partial<CoupleEntity>,post : PostEntity){
        return await this.likeRepo.findOne({
            where : {
                doer: doer,
                post : post
            }
        })
    }

}
