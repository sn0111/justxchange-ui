'use client';
import withAuth from '@/lib/auth/withAuth';
import { HomeContainer } from './container/home';

function Home() {
  return (
    <HomeContainer />
  );
}

export default withAuth(Home)
