import { IUser } from "./IAuth";

export interface IProduct {
  id: string;
  productId: number;
  description: string;
  productName: string;
  amount: number;
  categoryId: number;
  userId: number;
  images: string[];
  condition: string | null;
  brand: string | null;
  size: string | null;
  color: string | null;
  createdDate: string;
  updatedDate: string;
  createdBy: number;
  updatedBy: number;
  user: IUser;
}

export interface IProductFilters {
  productUuid: string;
  categoryUuid: string;
  searchQuery: string;
  condition: string;
  page: number;
  size: number;
  isFilter: boolean;
}

export interface ISuggesions {
  id: string;
  productName: string;
}

export interface IProductForm {
  productName: string;
  description: string;
  amount: number;
  categoryId: number;
  condition: string;
  brand: string;
  size: string;
  color: string;
}