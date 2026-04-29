import { FlavorModel } from './FlavorModel';

export interface ItemModel {
  id: string;
  idRequest: string;
  code: string;
  description: string;
  unity: string;
  amount: number;
  price: number;
  total: number;
  comments: string;
  combined: string;
  flavors: FlavorModel[];
}
