'use client';
import { useRouter } from 'next/navigation';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

interface AuthContextType {
  authenticationToken: string;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [authenticationToken, setAuthenticationToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token') ?? '';
    const expirationTime = localStorage.getItem('tokenExpiration');

    if (token && expirationTime) {
      const now = new Date().getTime();
      if (now > parseInt(expirationTime, 10)) {
        // Token expired
        logout();
      } else {
        setAuthenticationToken(token);

        // Set a timeout to logout the user when the token expires
        const timeRemaining = parseInt(expirationTime, 10) - now;
        const timer = setTimeout(logout, timeRemaining);

        return () => clearTimeout(timer); // Cleanup timeout on unmount
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (token: string) => {
    const expirationTime = new Date().getTime() + 3600 * 1000;
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', expirationTime.toString());
    setAuthenticationToken(token);

    // Set a timeout to logout the user after 1jr
    const timer = setTimeout(logout, 3600 * 1000);
    return () => clearTimeout(timer); // Cleanup previous timeout if any
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    setAuthenticationToken('');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ authenticationToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
