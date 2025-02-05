import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { usePathname } from 'next/navigation';
interface WithAuthProps {
  allowedRole?: string; // Allow passing role or nothing at all
}

const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  { allowedRole }: WithAuthProps = {}
) => {
  const AuthenticatedComponent = (props: P) => {
    const { authenticationToken, login, role } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const currentPath = usePathname();
    useEffect(() => {
      if (!authenticationToken && localStorage.getItem('token') === '') {
        router.replace('/welcome');
        return;
      } else {
        login(localStorage.getItem('token') || '');
      }
      // If there is an allowedRole, check if role matches
      if (allowedRole && localStorage.getItem('role') !== allowedRole) {
        router.push(`${currentPath}/un-authorized`);
        return;
      }

      setLoading(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authenticationToken, router, allowedRole, role, login]);

    // If still loading, render a loading spinner or nothing
    if (loading) {
      return; // Or your preferred loading indicator
    }
    console.log('Role:', role);

    // Only render the component if the user is authenticated and authorized
    return authenticationToken ? <Component {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
