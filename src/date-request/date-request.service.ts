import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DateRequestEntity} from "../models/date/date-request.entity";
import {DataSource, Repository} from "typeorm";
import {CoupleEntity} from "../models/couple.entity";
import {DateRequestDto} from "./dto/date-request.dto";
import {CoupleService} from "../couple/couple.service";
import {UserNotFoundException} from "../couple/exception/user-not-found.exception";
import {DateScheduleEntity} from "../models/date/date-schedule.entity";

@Injectable()
export class DateRequestService {
    constructor(
        @InjectRepository(DateRequestEntity)
        private dateRequestRepo : Repository<DateRequestEntity>,
        private coupleService : CoupleService ,
        private dataSource : DataSource
    ) {
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



}
