import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {SignUpDto} from "./dto/sign-up.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {CoupleEntity} from "../models/couple.entity";
import {Repository} from "typeorm";
import {PersonEntity} from "../models/person.entity";
import {PersonDto} from "./dto/person.dto";
import * as bcrypt from 'bcrypt';
import {LoginDto} from "./dto/login.dto";
import {JwtService} from "@nestjs/jwt";
@Injectable()
export class CoupleService {

    constructor(
        @InjectRepository(CoupleEntity)  private coupleRepo : Repository<CoupleEntity>,
        @InjectRepository(PersonEntity) private personRepo : Repository<PersonEntity>,
        private jwtService : JwtService
    ) {
    }

    private createPerson(personDto : PersonDto){
        return this.personRepo.create(
            personDto
        );
    }

    async signUp(signUpDto : SignUpDto){
        const coupleToFind= this.coupleRepo.findOneBy(
            [{email : signUpDto.email}, {username : signUpDto.username}]
        )
        if (coupleToFind!=null){
            throw new ConflictException("username or email already exists")
        }
        const {firstPartner , secondPartner ,...coupleInfo}=signUpDto
        const couple = this.coupleRepo.create(coupleInfo)
        couple.firstPartner=this.createPerson(firstPartner)
        couple.secondPartner=this.createPerson(secondPartner)
        couple.salt=await bcrypt.genSalt()
        couple.password= await bcrypt.hash(couple.password,couple.salt)
        const {password , salt , ...returnedCoupleInfo} = couple
        try {
            await this.coupleRepo.save(couple)
        }
        catch (e) {
            throw new ConflictException("Une erreur est survenue veuillez réessayer")
        }
        return returnedCoupleInfo
    }

    async login(credentials : LoginDto){
        const couple= await this.coupleRepo.findOne(
            {
                where : [{email : credentials.login}, {username : credentials.login}] ,
                relations: ["firstPartner" , "secondPartner"]
            }
        )
        if (!couple){
            throw new NotFoundException("Compte introuvable")
        }
        const hashedPassword = await bcrypt.hash(credentials.password,couple.salt)
        if (hashedPassword==couple.password){
            const payload = {
                id : couple.id,
                email : couple.email,
                username : couple.username,
                firstPartnerId : couple.firstPartner.id,
                secondPartner : couple.secondPartner.id
            }
            const token = await this.jwtService.sign(payload)

            return {
                ...payload,
                "token": token
            }
        }else {
            throw new ConflictException("mot de passe erroné")
        }

    }



}
