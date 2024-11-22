import { IUser } from './IAuth';
import { IProduct } from './IProduct';

export interface IChat {
  id: string;
  chatId: number;
  productId: number;
  buyerId: number;
  createdDate: string;
  updatedDate: string;
  product: IProduct;
  buyer: IUser;
  message: Message[];
}

export interface Message {}
