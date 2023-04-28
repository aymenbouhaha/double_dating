import {MessageEntity} from "../../models/messages/message.entity";
import {CoupleEntity} from "../../models/couple.entity";
import {PostEntity} from "../../models/post.entity";



export interface CreateMessagePayload{

    message : MessageEntity

    author : Partial<CoupleEntity>

    recepient : Partial<CoupleEntity>

}


export interface LikePostPayload{

    doer : Partial<CoupleEntity>

    post : PostEntity
}

export interface RespondCommentPayload {

    content : string

    doer : Partial<CoupleEntity>

    post : PostEntity



}