import {ConflictException, HttpStatus, Injectable} from '@nestjs/common';
import {SignUpDto} from "./dto/sign-up.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {CoupleEntity} from "../models/couple.entity";
import {Repository} from "typeorm";
import {PersonEntity} from "../models/person.entity";
import {PersonDto} from "./dto/person.dto";
import * as bcrypt from 'bcrypt';
import {LoginDto} from "./dto/login.dto";
import {JwtService} from "@nestjs/jwt";
import {MailService} from "./mail/mail.service";
import {UserExistException} from "./exception/user-exist.exception";
import {UserNotFoundException} from "./exception/user-not-found.exception";
import {PasswordErrorException} from "./exception/password-error.exception";
import {EmailNotSentException} from "./exception/email-not-sent.exception";
import {VerifyCodeDto} from "./dto/verify-code.dto";
import {VerificationFailedException} from "./exception/verification-failed.exception";


@Injectable()
export class CoupleService {

    constructor(
        @InjectRepository(CoupleEntity)  private coupleRepo : Repository<CoupleEntity>,
        @InjectRepository(PersonEntity) private personRepo : Repository<PersonEntity>,
        private jwtService : JwtService,
        private mailService : MailService
    ) {
    }

    private createPerson(personDto : PersonDto){
        return this.personRepo.create(
            personDto
        );
    }

    async signUp(signUpDto : SignUpDto){
        const coupleToFind= await this.coupleRepo.findOneBy(
            [{email : signUpDto.email}, {username : signUpDto.username}]
        )
        if (coupleToFind!=null){
            throw new UserExistException()
        }
        const {firstPartner , secondPartner ,...coupleInfo}=signUpDto
        const couple = this.coupleRepo.create(coupleInfo)
        couple.firstPartner=this.createPerson(firstPartner)
        couple.secondPartner=this.createPerson(secondPartner)
        couple.salt=await bcrypt.genSalt()
        couple.password= await bcrypt.hash(couple.password,couple.salt)
        const verifCode = Math.floor(1000+ Math.random()*9000).toString()
        couple.verificationCode=verifCode
        couple.verified=false
        const {password , salt , verificationCode, ...returnedCoupleInfo} = couple
        try {
            await this.coupleRepo.save(couple)
        }
        catch (e) {
            throw new ConflictException("Une erreur est survenue veuillez réessayer")
        }
        try {
            this.mailService.sendVerificationCode(couple.email,couple.verificationCode)
        }catch (e) {
            throw new EmailNotSentException()
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
            throw new UserNotFoundException()
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
            throw new PasswordErrorException()
        }
    }

    async verifyAccount(couple : Partial<CoupleEntity>,verifyCode: VerifyCodeDto) {
        console.log(couple.verificationCode)
        if (couple.verified){
            return {
                "already-verfied" : true
            }
        }else {
            if (verifyCode.code==couple.verificationCode){
                try {
                    await this.coupleRepo.update(couple.id,{verified : true})
                }catch (e) {
                    throw new VerificationFailedException("Une erreur est survenue veuillez réesseayer", HttpStatus.AMBIGUOUS)
                }
                return {
                    "verified" : true
                }
            }else {
                throw new VerificationFailedException("Le code n'est pas correcte", HttpStatus.BAD_REQUEST)
            }
        }
    }

    async findCoupleById(id : number)
    {
        return await this.coupleRepo.findOneBy({id : id})
    }
    async saveCouple(couple: CoupleEntity)
    {
        return await this.coupleRepo.save(couple) ;
    }

}
