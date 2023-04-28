import {OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {GatewaySessionManager} from "./gateway.session";
import {AuthSocket} from "./auth-socket";
import {OnEvent} from "@nestjs/event-emitter";
import {Server} from "socket.io";
import {CreateMessagePayload, LikePostPayload, RespondCommentPayload} from "./event-payload/event-payload.interfaces";

@WebSocketGateway({
    pingInterval: 10000,
    pingTimeout: 15000,
})
export class Gateway implements OnGatewayConnection , OnGatewayDisconnect{

    constructor(
        private gatewaySessionManager : GatewaySessionManager
    ) {
    }

    @WebSocketServer()
    server : Server

    handleConnection(client: AuthSocket, ...args: any[]): any {
        this.gatewaySessionManager.setUserSocket(client.couple.id,client)
        const payload ={
            id : client.couple.id,
            username: client.couple.username,
            email : client.couple.email
        }
        const connectedUser=this.gatewaySessionManager.getConnectedUsers()
        client.emit("connectedUsers", connectedUser)
        this.server.emit("userConnected", payload)
    }

    handleDisconnect(client: AuthSocket): any {
        this.gatewaySessionManager.removeUserSocket(client.couple.id)
        const payload ={
            id : client.couple.id,
            username: client.couple.username,
            email : client.couple.email
        }
        this.server.emit("userDisconnected", payload)
    }


    @OnEvent("message.create")
    handleCreateMessage(payload : CreateMessagePayload){
        const {message , author , recepient} = payload
        const authorSocket = this.gatewaySessionManager.getUserSocket(author.id)
        const recepientSocket = this.gatewaySessionManager.getUserSocket(recepient.id)

        if (authorSocket)
            authorSocket.emit("onMessage", payload)
        if (recepientSocket)
            recepientSocket.emit("onMessage", payload)
    }


    @OnEvent("like.add")
    handleLikePost(payload : LikePostPayload){
        this.server.emit("onLike",payload)
    }


    @OnEvent("comment.respond")
    handleCommentRespond(payload : RespondCommentPayload){
        this.server.emit("onComment", payload)
    }


    @OnEvent("like.delete")
    handleDislike(payload: LikePostPayload){
        this.server.emit("onDislike", payload)
    }




}