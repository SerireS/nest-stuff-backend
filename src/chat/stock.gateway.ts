import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Inject } from '@nestjs/common';
import { IChatServiceProvider } from '../primary-ports/chat.service.interface';
import { IStockService } from '../primary-ports/stock.service.interface';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class StockGateway {
  constructor(
    @Inject(IChatServiceProvider) private stockService: IStockService,
  ) {}
  @WebSocketServer() server;

  @SubscribeMessage('stock')
  async handleStockEvent(
    @MessageBody() stockName: string,
    initValue: number,
    currentValue: number,
    description: string,
    @ConnectedSocket() stock: Socket,
  ): Promise<void> {
    try {
      const stockClient = await this.stockService.newStock(
        stock.id,
        stockName,
        initValue,
        currentValue,
        description,
      );
      const stockClients = await this.stockService.getStocks();
      this.server.emit('stock', stockClient);
      this.server.emit('stocks', stockClients);
    } catch (e) {
      stock.error(e.message);
    }
  }
}
