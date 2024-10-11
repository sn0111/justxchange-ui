export const API_ENDPOINTS = {
  product: {
    getProductById: (id: string) => `/api/products/${id}`,
    getImage: () => `/api/upload-image`,
    addProduct: () => `/api/products`,
    getProduct: () => `/api/products`,
  },
  category: {
    getCategories: () => `/api/categories`,
  },
};
