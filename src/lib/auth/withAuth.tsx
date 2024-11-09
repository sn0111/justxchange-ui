'use client';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const { isAuthenticated, login } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated && localStorage.getItem('token') === '') {
        router.replace('/login');
      } else {
        login(localStorage.getItem('token') || '');
      }
    }, [isAuthenticated, router]);

    // Only render the component if the user is authenticated
    return isAuthenticated && <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
