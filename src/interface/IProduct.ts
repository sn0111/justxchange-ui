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
  createdDate: string;
  updatedDate: string;
  createdBy: number;
  updatedBy: number;
}
