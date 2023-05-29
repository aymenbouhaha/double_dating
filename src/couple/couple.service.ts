import {ConflictException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {SignUpDto} from "./dto/sign-up.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {CoupleEntity} from "../models/couple.entity";
import {In, Not, Repository} from "typeorm";
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
import {CoupleProfileDto} from "./dto/coupleProfile.dto";
import { RequestEntity } from 'src/models/request.entity';
import { DateScheduleEntity } from 'src/models/date/date-schedule.entity';


@Injectable()
export class CoupleService {
    dateScheduleRepository: any;

    constructor(
        @InjectRepository(CoupleEntity)  private coupleRepo : Repository<CoupleEntity>,
        @InjectRepository(PersonEntity) private personRepo : Repository<PersonEntity>,
        @InjectRepository(RequestEntity) private requestRepo : Repository<RequestEntity>,
        @InjectRepository(DateScheduleEntity) private dateScheduleRepo : Repository<DateScheduleEntity>,


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

    async findCoupleById(id : number){
        return await this.coupleRepo.findOneBy({id : id})
    }

    async searchCoupleByUsername(username: string): Promise<CoupleEntity | undefined> {
        return this.coupleRepo.findOne({ where: { username } });
      }
      


    async updateCouple(couple: CoupleEntity): Promise<CoupleEntity> {
        try {
          const id =couple.id;
          const existingCouple = await this.coupleRepo.findOne({ where: { id } });
          if (!existingCouple) {
            throw new NotFoundException('Couple not found');
          }
      
          // Update the properties of the existing couple entity
          existingCouple.username = couple.username;
          existingCouple.email = couple.email;
          existingCouple.anniversary = couple.anniversary;
          existingCouple.firstPartner = couple.firstPartner;
          existingCouple.secondPartner = couple.secondPartner;
          // Update other properties as needed
      
          const updatedCouple = await this.coupleRepo.save(existingCouple);
          return updatedCouple;
        } catch (error) {
          // Handle any errors that occur during the update operation
          throw new InternalServerErrorException('Failed to update couple', error);
        }
      }
      

    async getCoupleProfile(id: number): Promise<CoupleProfileDto> {
        const couple = await this.coupleRepo.findOne({
          where: { id },
          relations: ['interests', 'friends', 'posts'],
        });
      
        if (!couple) {
          throw new NotFoundException('Couple not found');
        }
      
        const coupleProfile: CoupleProfileDto = {
          id: couple.id,
          username: couple.username,
          email: couple.email,
          interests: couple.interest,
          numberOfFriends: couple.friends.length,
          posts: couple.posts,
        };
      
        return coupleProfile;
      }
      

      async getCoupleSuggestions(coupleId: number, selectedInterests: number[]): Promise<CoupleProfileDto[]> {
        const suggestedCouples = await this.coupleRepo.find({
          where: {
            id: Not(coupleId), 
            interest: In(selectedInterests), 
          },
          relations: ['interest'], 
          take: 10, // Limit 
        });
      
        return suggestedCouples.map((couple) => this.mapCoupleToProfileDto(couple));
      }
      
      private mapCoupleToProfileDto(couple: CoupleEntity): CoupleProfileDto {
        const coupleProfileDto = new CoupleProfileDto();
        coupleProfileDto.id = couple.id;
        coupleProfileDto.username = couple.username;
        coupleProfileDto.email = couple.email;
        coupleProfileDto.interests = couple.interest;
        coupleProfileDto.numberOfFriends = couple.friends.length;
        coupleProfileDto.posts = couple.posts;
        
      
        return coupleProfileDto;
      }
      
      async getReceivedInvitations(coupleId: number): Promise<RequestEntity[]> {
        return this.requestRepo.find({
          where: {
            reciever: { id: coupleId },
          },
          relations: ['sender'], 
        });
      }
      
      async getAllDates(coupleId: number): Promise<DateScheduleEntity[]> {
        return this.dateScheduleRepo.find({
          where: [
            { firstCouple: { id: coupleId } },
            { secondCouple: { id: coupleId } },
          ],
        });
      }
      

}
