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
  message: IMessage[];
  userLastSeen: string;
  buyerLastSeen: string;
}

export interface IMessage {
  id: string;
  message: string;
  chatId: number;
  messageId: number;
  userId: number;
  createdDate: string;
  updatedDate: string;
}
