export const API_ENDPOINTS = {
  product: {
    getProductById: (id: string) => `/products/${id}`,
    getImage: () => `/upload-image`,
    addProduct: () => `/products`,
    getProduct: () => `/products`,
    getProductByCategory: (categoryId: number) =>
      `/products/category/${categoryId}`,
  },
  category: {
    getCategories: () => `/categories`,
  },
};
