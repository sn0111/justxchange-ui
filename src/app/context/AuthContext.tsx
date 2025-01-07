'use client';
import { useRouter } from 'next/navigation';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  authenticationToken: string;
  login: (token: string) => void;
  logout: () => void;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [authenticationToken, setAuthenticationToken] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null); // Use useRef to persist the timer

  useEffect(() => {
    const token = localStorage.getItem('token') ?? '';
    const expirationTime = localStorage.getItem('tokenExpiration');

    if (token && expirationTime) {
      const now = new Date().getTime();

      if (now > parseInt(expirationTime, 10)) {
        // Token expired
        console.log('Token expired');
        logout();
      } else {
        setAuthenticationToken(token);
        const decoded = jwtDecode<{ role: string }>(token);
        const userRole = decoded.role;
        setRole(userRole);

        // Set a timeout to logout the user when the token expires
        const timeRemaining = parseInt(expirationTime, 10) - now;
        console.log('Time remaining before logout:', timeRemaining);

        logoutTimerRef.current = setTimeout(logout, timeRemaining);
      }
    } else {
      console.log('No token found in localStorage');
      router.push('/login');
    }

    return () => {
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current); // Cleanup timeout on unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (token: string) => {
    if (!token) return;
    const decoded = jwtDecode<{ role: string }>(token);
    const userRole = decoded.role;
    console.log('User role:', userRole);

    // Set expiration to 1 minute (1 * 60 * 1000ms)
    const expirationTime = new Date().getTime() + 1 * 60 * 60 * 1000;
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', expirationTime.toString());
    localStorage.setItem('role', userRole);

    setAuthenticationToken(token);
    setRole(userRole);

    // Calculate remaining time for token expiration
    const timeRemaining = expirationTime - new Date().getTime();
    console.log('Token expiration set to:', expirationTime);
    console.log('Time remaining for token:', timeRemaining);

    // Clear any existing timer and set a new one
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = setTimeout(logout, timeRemaining);
  };

  const logout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('role');
    setAuthenticationToken('');
    setRole('');
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current); // Clear the timeout on logout
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ authenticationToken, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
