import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Inject } from '@nestjs/common';
import { IChatServiceProvider } from '../primary-ports/chat.service.interface';
import { IStockService } from '../primary-ports/stock.service.interface';
import { Socket } from "socket.io";

@WebSocketGateway()
export class StockGateway {
  constructor(
    @Inject(IChatServiceProvider) private stockService: IStockService,
  ) {}
  @WebSocketServer() server;
  
  @SubscribeMessage('stock')
  async handleStockEvent(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const chatMessage = await this.stockService.newStock;
    this.server.emit('newMessage', chatMessage);
  }
}
