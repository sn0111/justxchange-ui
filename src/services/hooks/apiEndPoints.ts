export const API_ENDPOINTS = {
  product: {
    getProductById: (id: string) => `/products/${id}`,
    getImage: () => `/upload-image`,
    addProduct: () => `/products`,
    getProduct: () => `/products`,
    getUserProducts: () => `/products/user`,
    getProductByCategory: (categoryId: number) =>
      `/products/category/${categoryId}`,
    addToWishlist: (productUuid: string) =>
      `/products/add-wishlist/${productUuid}`,
    getWishlists: () => `/products/user-wishlists`,
    filterProducts: () => `/products/filter`,
    productSuggestions: () => `/products/suggestions`,
  },
  category: {
    getCategories: () => `/categories`,
  },
  chat: {
    createChat: () => `/chats`,
    getChats: () => `/chats`,
    sendMessage: () => `/chats/message`,
    getChatMessages: (chatId: number) => `/chats/messages/${chatId}`,
    getProductChats: (productUuid: string) => `chats/product/${productUuid}`,
  },
  auth: {
    loginUser: () => `/login-user`,
    saveUser: () => `/save-user`,
    sendOtp: () => `/signup`,
    verifyOtp: () => `/verify-otp`,
    forgotPassword: () => `/forgot-password`,
  },
  user: {
    userprofile: () => `/user-profile`,
    saveProfile: () => '/save-profile',
  },
  logs: {
    auditLogs: `/audit/logs`,
  },
};
