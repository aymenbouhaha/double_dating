import {OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway} from "@nestjs/websockets";
import {GatewaySessionManager} from "./gateway.session";
import {AuthSocket} from "./auth-socket";

@WebSocketGateway({
    pingInterval: 10000,
    pingTimeout: 15000,
})
export class Gateway implements OnGatewayConnection , OnGatewayDisconnect{

    constructor(
        private gatewaySessionManager : GatewaySessionManager
    ) {
    }


    handleConnection(client: AuthSocket, ...args: any[]): any {
        this.gatewaySessionManager.setUserSocket(client.couple.id,client)
    }


    handleDisconnect(client: AuthSocket): any {
        this.gatewaySessionManager.removeUserSocket(client.couple.id)
    }



}