import {Socket} from "socket.io";
import {CoupleEntity} from "../models/couple.entity";


export interface AuthSocket extends Socket{
    couple? : CoupleEntity
}