import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FriendEntity} from "../models/friend.entity";
import {Repository} from "typeorm";

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





}
