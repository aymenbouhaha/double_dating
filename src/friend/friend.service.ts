import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FriendEntity} from "../models/friend.entity";
import {Repository} from "typeorm";
import {CoupleEntity} from "../models/couple.entity";

@Injectable()
export class FriendService {

    constructor(
        @InjectRepository(FriendEntity) private friendRepo : Repository<FriendEntity>,
    ) {
    }

    async isFriend(coupleOne: number, coupleTwo: number) {
        const friend = await this.friendRepo.findOneBy(
            [
                {coupleOneId: coupleOne, coupleTwoId: coupleTwo},
                {coupleOneId: coupleTwo, coupleTwoId: coupleOne}
            ]
        )
        // c quoi !!friend  ?
        return !!friend
    }

    async getFriends(coupleId : number){
        return await this.friendRepo.findBy([{coupleOneId : coupleId} , {coupleTwoId : coupleId}])
    }

    async getFriendById(coupleOne: number, coupleTwo: number) {
        return  await this.friendRepo.findOne(
            {
                where : [
                    {coupleOneId: coupleOne, coupleTwoId: coupleTwo},
                    {coupleOneId: coupleTwo, coupleTwoId: coupleOne}
                ],
                relations : ["coupleOne" , "coupleTwo"]
            }
        )
    }

    async  Createfriend(coupleOne: CoupleEntity,coupleTwo : CoupleEntity) {
        const friends= await this.friendRepo.create() ;
        friends.coupleOne=coupleOne
        friends.coupleTwo=coupleTwo
        friends.coupleOneId=coupleOne.id
        friends.coupleTwoId= coupleTwo.id
        return this.friendRepo.save(friends) ;
    }



}
