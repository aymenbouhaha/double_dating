import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {InterestEntity} from "../models/interest.entity";
import {Repository} from "typeorm";
import {CoupleEntity} from "../models/couple.entity";
import {CoupleService} from "../couple/couple.service";

@Injectable()
export class InterestService {
    constructor( @InjectRepository(InterestEntity) private interestRepo : Repository<InterestEntity>,
                 private coupleService : CoupleService) {
    }
    async  chooseInterests (coupleId : number , interestsids : number[])
    {
        const interests=await this.interestRepo.findByIds(interestsids);
        const couple   =await this.coupleService.findCoupleById(coupleId) ;
       couple.interest=interests ;
      // Nheb nchargi lcouple entity keemlaa
      //  couple.interest.concat(interests) ;

        return await this.coupleService.saveCouple(couple) ;
    }
    /*
    async InterestExists (coupleId : number, interestsids: number[] ) {
    }
    */
    }


