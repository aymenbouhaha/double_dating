import { Injectable } from '@nestjs/common';
import {Socket} from "socket.io";
import {AuthSocket} from "./auth-socket";

@Injectable()
export class GatewaySessionManager {
    private readonly sessions: Map<number, AuthSocket> = new Map();

    getUserSocket(id: number) {
        return this.sessions.get(id);
    }

    setUserSocket(userId: number, socket: Socket) {
        this.sessions.set(userId, socket);
    }
    removeUserSocket(userId: number) {
        this.sessions.delete(userId);
    }
    getSockets(): Map<number, Socket> {
        return this.sessions;
    }
}
