import {BadRequestException, ConflictException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {RequestEntity, RequestStatus} from "../models/request.entity";
import {Repository} from "typeorm";
import {SendRequestDto} from "./dto/send-request.dto";
import {FriendService} from "../friend/friend.service";
import {CoupleService} from "../couple/couple.service";
import {UserNotFoundException} from "../couple/exception/user-not-found.exception";
import {FriendExistException} from "../friend/exceptions/friend-exist.exception";
import {CoupleEntity} from "../models/couple.entity";

@Injectable()
export class InvitationService {

    constructor(
        @InjectRepository(RequestEntity)
        private requestRepo : Repository<RequestEntity>,
        private friendService : FriendService,
        private coupleService : CoupleService,
    ) {
    }

    async sendInvitation(sender  : Partial<CoupleEntity>,requestDto: SendRequestDto){
        const receiver = await this.coupleService.findCoupleById(requestDto.recieverId)
        if (!receiver)
            throw new UserNotFoundException()
        if (requestDto.recieverId== sender.id){
            throw new BadRequestException("Vous pouvez pas ajouter vous meme")
        }
        const friendshipTest = await this.friendService.isFriend(sender.id,requestDto.recieverId)
        if (friendshipTest)
            throw new FriendExistException()
        const request = await this.findRequest(sender,receiver)
        if (request)
            throw new BadRequestException("L'invitation est deja envoyé")
        const newRequest = this.requestRepo.create({
            sender : sender,
            reciever : receiver,
            //le statut est par defaut pending
            status : RequestStatus.pending
        })
        try {
            const requestAdded = await this.requestRepo.save(newRequest)
            // Todo : Notify Sender

            return requestAdded
        }
        catch (e) {
            throw new ConflictException("Un erreur est survenue")
        }
    }

    async findRequest(sender : Partial<CoupleEntity>, receiver : CoupleEntity){
        return await this.requestRepo.findOneBy(
            [
                {
                    sender : sender,
                    reciever : receiver
                },
                {
                    sender : receiver,
                    reciever : sender
                }
            ]
        )
    }

    async respondToRequest(requestId : number,response : RequestStatus ) {
        const request=await this.requestRepo.findOneById(requestId) ;
        if(!request)
            throw new BadRequestException("Une erreur s'est produite")
        if(response=="declined")
            return await this.requestRepo.remove(request) ;
        if(response=="accepted")
        {
            await this.friendService.Createfriend(request.sender,request.reciever) ;
            await this.requestRepo.remove(request)
        }
        return request ;
    }

}
