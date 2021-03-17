import { ChatClient } from '../../models/chat-client.model';
import { ChatMessage } from '../../models/chat-message.model';

export interface WelcomeDto {
  clients: ChatClient[];
  client: ChatClient;
  messages: ChatMessage[];
}
