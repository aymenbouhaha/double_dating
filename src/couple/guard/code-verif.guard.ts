import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {CoupleEntity} from "../../models/couple.entity";
import {UserNotVerifiedException} from "../exception/user-not-verified.exception";


@Injectable()
export class CodeVerificationGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const user : Partial<CoupleEntity>= request["user"]
        if (!user.verified){
            throw new UserNotVerifiedException()
        }
        return user.verified
    }
}