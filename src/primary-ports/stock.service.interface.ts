import { Stock } from '../infrastructure/stock';
import { StockModel } from '../models/stock.model';

export const IStockServiceProvider = 'IStockServiceProvider';
export interface IStockService {
  newStock(
    id: string,
    stockName: string,
    initValue: number,
    currentValue: number,
    description: string,
  ): Promise<StockModel>;

  getStocks(): Promise<StockModel[]>;

  delete(id: string): Promise<void>;

  updateStocks(id: string): Promise<Stock>;
}
