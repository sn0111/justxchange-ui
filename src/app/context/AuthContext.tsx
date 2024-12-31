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
        console.log('Token expired'); // Debugging token expiration
        logout();
      } else {
        setAuthenticationToken(token);

        // Set a timeout to logout the user when the token expires
        const timeRemaining = parseInt(expirationTime, 10) - now;
        console.log('Time remaining before logout:', timeRemaining); // Debugging remaining time
        const timer = setTimeout(logout, timeRemaining);

        return () => clearTimeout(timer); // Cleanup timeout on unmount
      }
    } else {
      console.log('No token found in localStorage');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (token: string) => {
    const expirationTime = new Date().getTime() + 30 * 60 * 1000; // Set expiration to 30 minutes (30 * 60 * 1000ms)
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', expirationTime.toString());
    setAuthenticationToken(token);

  // Calculate remaining time for token expiration
  const timeRemaining = expirationTime - new Date().getTime();
  
  // Debugging expiration time and time remaining
  console.log('Token expiration set to:', expirationTime);
  console.log('Time remaining for token:', timeRemaining);



  // Set a timeout to logout the user when the token expires
  const timer = setTimeout(logout, timeRemaining); 

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
