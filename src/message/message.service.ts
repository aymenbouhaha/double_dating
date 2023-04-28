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
import {MediaEntity} from "../models/media/media.entity";
import {v4 as uuidv4} from "uuid";
import {MessageAttachmentEntity} from "../models/media/message-attachment.entity";

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

    async createMessage(author: Partial<CoupleEntity>, createMessageDto, attachments : Array<Express.Multer.File>) {
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
        const msgAtts : MessageAttachmentEntity[] =[]
        if (attachments){
            attachments.forEach(
                (file)=>{
                    const msgAtt = new MessageAttachmentEntity()
                    const uuid = uuidv4()
                    msgAtt.name=uuid
                    msgAtt.data=file.buffer
                    msgAtt.type=file.mimetype
                    msgAtts.push(msgAtt)
                }
            )
        }
        const newMessage = this.messageRepo.create({
            author: author,
            content: createMessageDto.content,
            conversation: conversation,
            attachment : msgAtts
        })
        try {
            const messageAdded =await this.messageRepo.save(newMessage)
            await this.conversationService.updateConversationLastMessage(messageAdded,conversation.id)
            const payload : CreateMessagePayload={
                message : messageAdded,
                author : author,
                recepient : recepientCouple,
                attachement : msgAtts
            }
            this.eventEmitter.emit("message.create",payload)
            return messageAdded
        } catch (e) {
            throw new ConflictException("Une erreur est survenue")
        }
    }


}
