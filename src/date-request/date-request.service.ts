import {BadRequestException, ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DateRequestEntity} from "../models/date/date-request.entity";
import {DataSource, Repository} from "typeorm";
import {CoupleEntity} from "../models/couple.entity";
import {DateRequestDto} from "./dto/date-request.dto";
import {CoupleService} from "../couple/couple.service";
import {UserNotFoundException} from "../couple/exception/user-not-found.exception";
import {DateScheduleEntity} from "../models/date/date-schedule.entity";
import {DateRequestSenderDto} from "./dto/date-request-sender.dto";

@Injectable()
export class DateRequestService {
    constructor(
        @InjectRepository(DateRequestEntity)
        private dateRequestRepo : Repository<DateRequestEntity>,
        private coupleService : CoupleService ,
        private dataSource : DataSource
    ) {
    }
    async SendDateRequest(sender : Partial<CoupleEntity> , dateRequestDto : DateRequestSenderDto ){
    const reciever=await this.coupleService.findCoupleById(dateRequestDto.recieverId) ;
    if(!reciever)
        throw new UserNotFoundException()
    const oldRequest=await this.findDateRequestByDate(sender,dateRequestDto.date) ;
    if(oldRequest)
        throw new BadRequestException('You already have a date on this date')
    const request=this.dateRequestRepo.create( {
        date : dateRequestDto.date ,
        sender : sender ,
        place : dateRequestDto.place ,
        recipient : reciever
    }) ;
    try {
        return await this.dateRequestRepo.save(request) ;
        }
    catch (e) {
        throw new ConflictException("Une erreur est survenue veuillez réessayer")
    }
    }

    async acceptDateRequest(reciever : Partial<CoupleEntity> , dateRequestDto : DateRequestDto ){

        const sender = await this.coupleService.findCoupleById(dateRequestDto.senderId)
        if (!sender)
            throw new UserNotFoundException()
        const request= await this.findDateRequestByRecieverSender(reciever,sender, dateRequestDto.place, dateRequestDto.date)
        if (!request){
            throw new NotFoundException("Le rendez-vous n'existe pas")
        }
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()
        console.log(queryRunner)
        try {
            await queryRunner.manager.delete(DateRequestEntity,request.id)
            const newDateSchedule = queryRunner.manager.create(DateScheduleEntity,{
                firstCouple : sender,
                secondCouple : reciever,
                place : request.place,
                date : request.date
            })
            await queryRunner.manager.save(DateScheduleEntity,newDateSchedule)
            await queryRunner.commitTransaction()
            // Todo : Notify Couples
            return newDateSchedule
        }
        catch (e) {
            await queryRunner.rollbackTransaction()
            await queryRunner.release()
            throw new ConflictException("Une erreur est survenue veuillez réessayer")
        }
    }

    async declineDateRequest(reciever : Partial<CoupleEntity> , dateRequestDto : DateRequestDto ){
        const sender = await this.coupleService.findCoupleById(dateRequestDto.senderId)
        if (!sender)
            throw new UserNotFoundException()
        const request= await this.findDateRequestByRecieverSender(reciever,sender, dateRequestDto.place, dateRequestDto.date)
        if (!request){
            throw new NotFoundException("Le rendez-vous n'existe pas")
        }
        try {
            return await this.dateRequestRepo.delete(request)
        }
        catch (e){
            throw new ConflictException("Une erreur est survenue veuillez réessayer")
        }
    }



    async findDateRequestByRecieverSender(reciever : Partial<CoupleEntity>, sender : CoupleEntity , place : string , date : Date){
        return await this.dateRequestRepo.findOneBy({
            recipient : reciever,
            sender : sender,
            date : date,
            place : place
        })

    }
    async findDateRequestByDate(sender : Partial<CoupleEntity>,date : string){
        const newDate = new Date(date);
        return await this.dateRequestRepo.findOneBy(
            [
                {
                    sender : sender,
                    date   : newDate
                }
            ]
        )
    }



}
