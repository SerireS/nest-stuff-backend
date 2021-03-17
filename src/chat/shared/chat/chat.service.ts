import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ChatClient } from '../../../models/chat-client.model';
import { ChatMessage } from '../../../models/chat-message.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../../infrastructure/client.entity';
import { log } from 'util';
import { promises } from 'dns';
import { Message } from '../../../infrastructure/message.entity';

@Injectable()
export class ChatService {
  allMessages: ChatMessage[] = [];
  clients: ChatClient[] = [];
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async newMessage(
    messageString: string,
    chatClientId: string,
  ): Promise<ChatMessage> {
    let message: Message = this.messageRepository.create();
    message.message = messageString;

    message.client = await this.clientRepository.findOne({ id: chatClientId });
    message.date = Date.now();
    console.log('message', message);
    message = await this.messageRepository.save(message);

    return {
      message: message.message,
      chatClient: message.client,
      date: message.date,
    };
  }

  async newClient(id: string, nickname: string): Promise<ChatClient> {
    const clientDb = await this.clientRepository.findOne({ nickname });
    if (!clientDb) {
      let client = this.clientRepository.create();
      client.id = id;
      client.nickname = nickname;
      client = await this.clientRepository.save(client);
      return { id: '' + client.id, nickname: client.nickname };
    }
    if (clientDb.id === id) {
      return { id: clientDb.id, nickname: clientDb.nickname };
    } else {
      throw new Error('Username already taken');
    }
  }

  async getClients(): Promise<ChatClient[]> {
    const clients = await this.clientRepository.find();
    const chatClients: ChatClient[] = JSON.parse(JSON.stringify(clients));
    return chatClients;
  }

  async getMessages(): Promise<ChatMessage[]> {
    const messages = await this.messageRepository.find();
    const chatMessages: ChatMessage[] = JSON.parse(JSON.stringify(messages));
    return chatMessages;
  }

  async delete(id: string): Promise<void> {
    await this.clientRepository.delete({ id: id });
    this.clients = this.clients.filter((c) => c.id !== id);
  }

  async updateTyping(typing: boolean, id): Promise<ChatClient> {
    const clients = await this.clientRepository.find();
    const chatClients: ChatClient[] = JSON.parse(JSON.stringify(clients));

    const chatClient = await chatClients.find((c) => c.id === id);
    if (chatClient && chatClient.typing !== typing) {
      chatClient.typing = typing;
      return chatClient;
    }
  }
}
