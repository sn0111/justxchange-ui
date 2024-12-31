'use client';
import withAuth from '@/lib/auth/withAuth';
import { ChatViewContainer } from '../container/chat_view';
import { Suspense } from 'react';

function Chat() {
  return (
    <Suspense><ChatViewContainer/></Suspense>
  );
}

export default withAuth(Chat);