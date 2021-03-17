import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { StockService } from './shared/chat/stock.service';
import { Stock } from '../infrastructure/stock';
import { StockGateway } from './stock.gateway';
import { IStockServiceProvider } from '../primary-ports/stock.service.interface';
@Module({
  imports: [TypeOrmModule.forFeature([Stock])],
  providers: [
    StockGateway,
    {
      provide: IStockServiceProvider,
      useClass: StockService,
    },
  ],
})
export class StockModule {}
