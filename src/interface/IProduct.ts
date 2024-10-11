export interface IProduct {
    productId?: number;
    productName: string;
    description: string;
    amount: number;
    categoryId: number;
    userId: number;
    images?: string[];
    condition: string;
}