import {ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ConversationEntity} from "../models/conversation.entity";
import {Repository} from "typeorm";
import {CoupleEntity} from "../models/couple.entity";
import {MessageEntity} from "../models/messages/message.entity";
import {CoupleService} from "../couple/couple.service";
import {UserNotFoundException} from "../couple/exception/user-not-found.exception";
import {ConversationNotFoundException} from "./exceptions/conversation-not-found.exception";

@Injectable()
export class ConversationService {

    constructor(
        @InjectRepository(ConversationEntity)
        private conversationRepo : Repository<ConversationEntity>,
        private coupleService: CoupleService
    ) {
    }


    async findConversationByParts(firstUser : Partial<CoupleEntity> ,secondUser : Partial<CoupleEntity>){
        return await this.conversationRepo.findOneBy(
            [
                {author : firstUser , recipient: secondUser},
                {author : secondUser, recipient : firstUser}
            ]
        )

    }

    async createConversation(author : Partial<CoupleEntity>, recepient : CoupleEntity){
        try {
            const newConversation = this.conversationRepo.create({
                author : author,
                recipient : recepient
            })
            return await this.conversationRepo.save(newConversation)
        }catch (e) {
            throw new ConflictException("Veuillez réessayer")
        }
    }

    async updateConversationLastMessage(message : MessageEntity, conversationId : number){
        return await this.conversationRepo.update(conversationId,{lastMessage : message})
    }

    async getConversations(couple: Partial<CoupleEntity>){
        return this.conversationRepo.find({
            where : [{author : couple} , {recipient : couple}],
            relations : ["lastMessage", "author", "recipient"]
        })
    }

    async getConversationWithMessages(firstUser : Partial<CoupleEntity> ,secondUserId : number ){
        const couple= await this.coupleService.findCoupleById(secondUserId)
        if (!couple)
            throw new UserNotFoundException()
        const conversation = await this.conversationRepo.findOne({
            where: [{author: firstUser, recipient: couple}, {author: couple, recipient: firstUser}],
            relations: ["messages", "author", "recipient"]
        })
        if (!conversation)
            throw new ConversationNotFoundException()
        return conversation
    }


}
