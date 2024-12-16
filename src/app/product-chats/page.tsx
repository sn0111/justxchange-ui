'use client';
import withAuth from '@/lib/auth/withAuth';
import { ChatViewContainer } from '../container/chat_view';
import { ProductChatContainer } from '../container/product_chats';

function ProductChats() {
  return <ProductChatContainer />;
}

export default withAuth(ProductChats);
