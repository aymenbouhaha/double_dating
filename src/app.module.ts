import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoupleModule } from './couple/couple.module';
import { PostModule } from './post/post.module';
import { ConversationModule } from './conversation/conversation.module';
import { GroupConversationModule } from './group-conversation/group-conversation.module';
import { InvitationModule } from './invitation/invitation.module';
import { RequestModule } from './request/request.module';
import { MessageModule } from './message/message.module';
import { GroupMessageModule } from './group-message/group-message.module';
import { CommentModule } from './comment/comment.module';
import { InterestModule } from './interest/interest.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommentEntity} from "./models/comment.entity";
import {ConversationEntity} from "./models/conversation.entity";
import {CoupleEntity} from "./models/couple.entity";
import {GroupConversationEntity} from "./models/group-conversation.entity";
import {GroupMessageEntity} from "./models/messages/group-message.entity";
import {MediaEntity} from "./models/media/media.entity";
import {InterestEntity} from "./models/interest.entity";
import {PersonEntity} from "./models/person.entity";
import {PostEntity} from "./models/post.entity";
import {RequestEntity} from "./models/request.entity";
import {MessageEntity} from "./models/messages/message.entity";
import {ConfigModule} from "@nestjs/config";
import {DateScheduleEntity} from "./models/date/date-schedule.entity";
import {DateRequestEntity} from "./models/date/date-request.entity";
import {NotificationEntity} from "./models/notification.entity";
import { DateScheduleModule } from './date-schedule/date-schedule.module';
import { DateRequestModule } from './date-request/date-request.module';
import {GroupMessageAttachmentEntity} from "./models/media/group-message-attachment.entity";
import {MessageAttachmentEntity} from "./models/media/message-attachment.entity";
import {GroupPictureEntity} from "./models/media/group-picture.entity";
import {ProfilePictureEntity} from "./models/media/profile-picture.entity";
import { GatewayModule } from './gateway/gateway.module';
import {MailerModule} from "@nestjs-modules/mailer";
import * as dotenv from 'dotenv';
import {FriendEntity} from "./models/friend.entity";
import { FriendModule } from './friend/friend.module';
import {EventEmitterModule} from "@nestjs/event-emitter";
import {LikeEntity} from "./models/like.entity";
import { LikeModule } from './like/like.module';



dotenv.config()
@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal : true
      }),
      CoupleModule,
    PostModule,
    ConversationModule,
    GroupConversationModule,
    InvitationModule,
    RequestModule, MessageModule,
    GroupMessageModule,
    CommentModule,
    InterestModule,
      MailerModule.forRoot(
          {
              transport: {
                  service: "hotmail",
                  auth: {
                      user: process.env.MAIL_USER,
                      pass: process.env.MAIL_PASSWORD,
                  },
              },
          }
      ),
      EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'ppp',
        entities: [
            LikeEntity,
            CommentEntity,
            ConversationEntity,
            CoupleEntity,
            GroupConversationEntity,
            GroupMessageEntity,
            MediaEntity,
            InterestEntity,
            PersonEntity,
            MessageEntity,
            PostEntity,
            RequestEntity,
            DateScheduleEntity,
            DateRequestEntity,
            NotificationEntity,
            GroupMessageAttachmentEntity,
            MessageAttachmentEntity,
            GroupPictureEntity,
            ProfilePictureEntity,
            FriendEntity
        ],
        synchronize: true,
        // logging: true
    }),
    DateScheduleModule,
    DateRequestModule,
    GatewayModule,
    FriendModule,
    LikeModule
  ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
