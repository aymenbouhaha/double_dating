import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {InterestEntity} from "../models/interest.entity";
import {Repository} from "typeorm";
import {CoupleEntity} from "../models/couple.entity";
import {ChooseInterestDto} from "./dto/choose-interest.dto";
import {CoupleService} from "../couple/couple.service";
import {InterestNotFoundException} from "./exceptions/interest-not-found.exception";

@Injectable()
export class InterestService {
    constructor(
        @InjectRepository(InterestEntity)
        private interestRepo : Repository<InterestEntity>,
        private coupleService : CoupleService
    ) {
    }


    async chooseInterests(couple : Partial<CoupleEntity>,interestDto : ChooseInterestDto)
    {
        const existingInterests=await this.findAll()
        const interestToAdd : InterestEntity[]=[]
        interestDto.interestNames.forEach(
            (interestName)=>{
                const index=existingInterests.findIndex((interest)=> interest.name==interestName)
                if (index==-1){
                    throw new InterestNotFoundException()
                }
                interestToAdd.push(existingInterests[index])
            }
        )
        couple.interest.push(...interestToAdd)
        try {
            await this.coupleService.saveCouple(couple)
            return interestToAdd
        }catch (e) {
            console.log(e)
            throw new ConflictException()
        }
    }


    async findAll(){
        return await this.interestRepo.find()
    }

}


