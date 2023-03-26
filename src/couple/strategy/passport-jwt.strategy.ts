import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {PayloadInterface} from "../interface/payload.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CoupleEntity} from "../../models/couple.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private config : ConfigService,
        @InjectRepository(CoupleEntity)
        private coupleRepository : Repository<CoupleEntity>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('SECRET'),
        });
    }

    async validate(payload: PayloadInterface) {
        const user = null
        if (!user) {
            throw new UnauthorizedException()
        }else {
            const { password , salt , ...result}=user
            return result;
        }

    }
}