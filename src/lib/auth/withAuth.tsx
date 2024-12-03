'use client';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const { authenticationToken, login } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!authenticationToken && localStorage.getItem('token') === '') {
        router.replace('/login');
      } else {
        login(localStorage.getItem('token') || '');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authenticationToken, router]);

    // Only render the component if the user is authenticated
    return authenticationToken && <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
