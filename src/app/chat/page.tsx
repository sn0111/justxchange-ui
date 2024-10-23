'use client';
import withAuth from '@/lib/auth/withAuth';
import { ChatViewContainer } from '../container/chat_view';

function Chat() {
  return (
    <ChatViewContainer/>
  );
}

export default withAuth(Chat);