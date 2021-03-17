import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './shared/chat/chat.service';
import { Client } from '../infrastructure/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IChatServiceProvider } from '../primary-ports/chat.service.interface';
import { Message } from '../infrastructure/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Message])],
  providers: [
    ChatGateway,
    {
      provide: IChatServiceProvider,
      useClass: ChatService,
    },
  ],
})
export class ChatModule {}
