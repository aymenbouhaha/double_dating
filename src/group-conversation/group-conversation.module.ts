import { Module } from '@nestjs/common';
import { GroupConversationService } from './group-conversation.service';
import { GroupConversationController } from './group-conversation.controller';

@Module({
  controllers: [GroupConversationController],
  providers: [GroupConversationService]
})
export class GroupConversationModule {}
