import {BadRequestException, ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MessageEntity} from "../models/messages/message.entity";
import {Repository} from "typeorm";
import {CreateMessageDto} from "./dto/create-message.dto";
import {CoupleService} from "../couple/couple.service";
import {UserNotFoundException} from "../couple/exception/user-not-found.exception";
import {ConversationService} from "../conversation/conversation.service";
import {CoupleEntity} from "../models/couple.entity";
import {FriendService} from "../friend/friend.service";
import {NotFriendException} from "../friend/exceptions/not-friend.exception";
import {EventEmitter2} from "@nestjs/event-emitter";
import {CreateMessagePayload} from "../gateway/event-payload/event-payload.interfaces";

@Injectable()
export class MessageService {

    constructor(
        @InjectRepository(MessageEntity)
        private messageRepo : Repository<MessageEntity>,
        private coupleService : CoupleService,
        private conversationService : ConversationService,
        private friendService : FriendService,
        private eventEmitter: EventEmitter2
    ) {
    }

    async createMessage(author: Partial<CoupleEntity>, createMessageDto: CreateMessageDto, attachments: any[]) {
        if (author.id === createMessageDto.recepientId)
            throw new BadRequestException("Vous ne pouvez pas envoyer des messages à vous même")
        const recepientCouple = await this.coupleService.findCoupleById(createMessageDto.recepientId)
        if (!recepientCouple)
            throw new UserNotFoundException()
        const isFriend = await this.friendService.isFriend(author.id,recepientCouple.id)
        if (!isFriend)
            throw new NotFriendException()
        let conversation = await this.conversationService.findConversationByParts(author, recepientCouple)
        if (!conversation) {
            conversation = await this.conversationService.createConversation(author, recepientCouple)
        }
        const newMessage = this.messageRepo.create({
            author: author,
            content: createMessageDto.content,
            conversation: conversation,
        })
        try {
            const messageAdded =await this.messageRepo.save(newMessage)
            await this.conversationService.updateConversationLastMessage(messageAdded,conversation.id)
            const payload : CreateMessagePayload={
                message : messageAdded,
                author : author,
                recepient : recepientCouple
            }
            this.eventEmitter.emit("message.create",payload)
            return messageAdded
        } catch (e) {
            throw new ConflictException("Une erreur est survenue")
        }
    }


}
