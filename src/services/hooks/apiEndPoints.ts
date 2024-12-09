export const API_ENDPOINTS = {
  product: {
    getProductById: (id: string) => `/products/${id}`,
    getImage: () => `/upload-image`,
    addProduct: () => `/products`,
    getProduct: () => `/products`,
    getUserProducts: () => `/user/products`,
    getProductByCategory: (categoryId: number) =>
      `/products/category/${categoryId}`,
  },
  category: {
    getCategories: () => `/categories`,
  },
  chat: {
    createChat: () => `/chat`,
    getChats: () => `/chats`,
    sendMessage: () => `/message`,
    getChatMessages: (chatId: number) => `/messages/${chatId}`,
  },
  auth: {
    loginUser: () => `/login-user`,
    saveUser: () => `/save-user`,
    sendOtp: (mobileNumber: string) => `/signup/${mobileNumber}`,
    verifyOtp: () => `/verify-otp`,
  },
};
