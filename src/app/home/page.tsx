'use client';
import withAuth from '@/lib/auth/withAuth';
import { HomeContainer } from '../container/home';

const Home = () => {
  return <HomeContainer />;
};

export default withAuth(Home);
