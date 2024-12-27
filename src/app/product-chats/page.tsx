'use client';
import withAuth from '@/lib/auth/withAuth';
import { ProductChatContainer } from '../container/product_chats';

function ProductChats() {
  return <ProductChatContainer />;
}

export default withAuth(ProductChats);
