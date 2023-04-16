import {IoAdapter} from "@nestjs/platform-socket.io";
import {AuthSocket} from "./auth-socket";
import {NextFunction} from "express";
import { verify } from "jsonwebtoken";
import {config} from "dotenv";
import {INestApplication} from "@nestjs/common";
import {CoupleService} from "../couple/couple.service";

config()
export class GatewayAdapter extends IoAdapter{

    constructor(private app : INestApplication) {
        super(app);
    }

    createIOServer(port: number, options?: any): any {
        const server =super.createIOServer(port, options);
        const coupleService=this.app.get(CoupleService)
        server.use(
            async (socket: AuthSocket, next: NextFunction)=>{
                const token=socket.handshake.headers["authorization"]
                if (!token){
                    return next(new Error("Not authenticated"))
                }
                try {
                    const decoded = verify(token,process.env.SECRET)
                    const couple=await coupleService.findCoupleById(decoded["id"])
                    socket.couple=couple
                    next()
                }catch (e){
                    return next(new Error("Not Valid token"))
                }
            }
        )
        return server
    }
}