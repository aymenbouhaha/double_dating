import { Controller } from '@nestjs/common';
import { GroupConversationService } from './group-conversation.service';

@Controller('group-conversation')
export class GroupConversationController {
  constructor(private readonly groupConversationService: GroupConversationService) {}
}
