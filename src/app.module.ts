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
import {GroupMessageEntity} from "./models/group-message.entity";
import {MediaEntity} from "./models/media.entity";
import {InterestEntity} from "./models/interest.entity";
import {PersonEntity} from "./models/person.entity";
import {PostEntity} from "./models/post.entity";
import {RequestEntity} from "./models/request.entity";
import {MessageEntity} from "./models/message.entity";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {DateScheduleEntity} from "./models/date-schedule.entity";
import {DateRequestEntity} from "./models/date-request.entity";
import {NotificationEntity} from "./models/notification.entity";
import { DateScheduleModule } from './date-schedule/date-schedule.module';
import { DateRequestModule } from './date-request/date-request.module';
import {GroupMessageAttachmentEntity} from "./models/group-message-attachment.entity";
import {MessageAttachmentEntity} from "./models/message-attachment.entity";
import {GroupPictureEntity} from "./models/group-picture.entity";
import {ProfilePictureEntity} from "./models/profile-picture.entity";
import { GatewayModule } from './gateway/gateway.module';
import {MailerModule} from "@nestjs-modules/mailer";
import * as dotenv from 'dotenv';


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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ppp',
      entities: [
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
          ProfilePictureEntity
      ],
      synchronize: true,
    }),
    DateScheduleModule,
    DateRequestModule,
    GatewayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
