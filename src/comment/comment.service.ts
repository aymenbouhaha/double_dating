import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {CommentEntity} from "../models/comment.entity";
import {DataSource, Repository} from "typeorm";
import {CoupleEntity} from "../models/couple.entity";
import {CommentRespondDto} from "./dto/comment-respond.dto";
import {EventEmitter2} from "@nestjs/event-emitter";
import {RespondCommentPayload} from "../gateway/event-payload/event-payload.interfaces";

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(CommentEntity)
        private commentRepo : Repository<CommentEntity>,
        private dataSource : DataSource,
        private eventEmitter : EventEmitter2
    ) {
    }


    async respondToComment(couple : Partial<CoupleEntity>,commentId : number,responseDto : CommentRespondDto ){
        const baseComment = await this.commentRepo.findOne({
            where : {id :commentId},
            relations : ["response","owner","post"]
        })
        if (!baseComment){
            throw new NotFoundException("Comment does not exist")
        }
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        const commentResponse=queryRunner.manager.create(CommentEntity,{
            content : responseDto.content,
            owner : couple,
            post : baseComment.post
        })
        try {
            const addedCommentResponse= await queryRunner.manager.save(CommentEntity,commentResponse)
            console.log(addedCommentResponse)
            baseComment.response.push(addedCommentResponse)
            await queryRunner.manager.save(CommentEntity,baseComment)
            await queryRunner.commitTransaction()
            const payload : RespondCommentPayload ={
                content : addedCommentResponse.content,
                doer : addedCommentResponse.owner,
                post : addedCommentResponse.post
            }
            this.eventEmitter.emit("comment.respond",payload)
            return addedCommentResponse
        }catch (e) {
            await queryRunner.rollbackTransaction()
            await queryRunner.release()
            throw new ConflictException("Error Occured")
        }

    }



}
