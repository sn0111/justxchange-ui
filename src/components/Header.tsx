'use client';

import { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';

import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Messages } from '@/lib/messages';
import { INotifications } from '@/interface';
import { API_URL } from '@/lib/constants';
import { io, Socket } from 'socket.io-client';
import {
  ArrowRight,
  Bell,
  CalendarCog,
  LogOut,
  Mail,
  Plus,
  Search,
  User,
} from 'lucide-react';
import Modal from '@/app/_components/dialog/Dialog';
import { LoginContainer } from '@/app/container/login';
import Button from './Button';
import UserPng from '@/public/images/user.png';
import { SignUpContainer } from '@/app/_components/signup';
import ForgotPasswordContainer from '@/app/container/forgot-password/ForgotPasswordContainer';

export const Header = () => {
  const [notifications, setNotifications] = useState<INotifications[]>([]);
  const auth = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const { authenticationToken, logout, role } = useAuth();
  const currentPath = usePathname();
  const router = useRouter();
  const [view, setView] = useState<'login' | 'signup' | 'forgot'>('login');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  useEffect(() => {
    console.log(currentPath);
  }, [currentPath]);

  useEffect(() => {
    !isLoginOpen && setView('login');
  }, [isLoginOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const socket = io(API_URL, {
      transports: ['websocket', 'polling'], // Ensure proper transport
    });
    socket.on('connect', () => {
      console.log('Connected to the server:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });
    setSocket(socket);
    socket.emit('subscribe', localStorage.getItem('userId'));

    socket.on('notification', (notification: INotifications) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    socket.on(
      'unread-notifications',
      (unreadNotifications: INotifications[]) => {
        console.log(unreadNotifications);
        setNotifications(unreadNotifications);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [auth.authenticationToken]);

  const markAsRead = (notificationIds: string[], productId: string) => {
    if (socket) {
      socket.emit('mark-as-read', notificationIds);
      setNotifications((prev) =>
        prev.map((n) =>
          notificationIds.includes(n.id) ? { ...n, isRead: true } : n
        )
      );
    }
    if (productId) router.push(`/view?productId=${productId}`);
  };

  const setLoginDialogOpen = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoginOpen(true);
  };

  return (
    <div>
      <div className="absolute top-0 w-full h-16 bg-gradiant-header"></div>
      <header className="fixed top-0  w-full z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">
              <Link href="/">
                <span className="bg-gradiant-theme text-transparent bg-clip-text animate-gradient-x">
                  JustXchange
                </span>
              </Link>
            </h1>
          </div>
          {!authenticationToken && (
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setIsLoginOpen(true)}
                icon={<ArrowRight />}
              >
                Login
              </Button>

              <Button onClick={() => null} icon={<Mail />}>
                <span className="hidden sm:inline">Contact</span>
              </Button>
            </div>
          )}
          {authenticationToken && (
            <div className="flex items-center gap-4 flex-1 justify-end">
              <>
                {role === Messages.user && (
                  <div className="hidden md:flex items-center gap-3">
                    <Link href="/add-product">
                      <Button icon={<Plus />} onClick={() => null}>
                        Sell
                      </Button>
                    </Link>
                  </div>
                )}
                {role === Messages.admin && (
                  <div className="hidden md:flex items-center gap-3">
                    <Link href="/audit-logs">
                      <Button
                        icon={<CalendarCog />}
                        size="default"
                        onClick={() => null}
                      />
                    </Link>
                  </div>
                )}
                <div className="relative cursor-pointer">
                  <Button
                    icon={<Bell />}
                    size="default"
                    iconClassName="ml-0"
                    onClick={() => setIsNotification(!isNotification)}
                  >
                    {notifications.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {notifications.length}
                      </span>
                    )}
                  </Button>
                  {isNotification && (
                    <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-3">
                      <h3 className="text-sm font-bold">Notifications</h3>
                      {notifications.length > 0 ? (
                        <ul>
                          {notifications.map((n) => (
                            <li
                              key={n.id}
                              className={`p-2 border-b ${n.isRead ? 'text-gray-400' : 'font-semibold'}`}
                              onClick={() => markAsRead([n.id], n.productId)}
                            >
                              <p className="text-xs font-bold text-gray-700">
                                {n.productName}
                              </p>
                              <p
                                className="text-sm text-gray-500 truncate"
                                title={n.message}
                              >
                                {n.message.length > 30
                                  ? `${n.message.substring(0, 30)}...`
                                  : n.message}
                              </p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">
                          No notifications
                        </p>
                      )}
                      <button
                        className="mt-2 text-blue-500 text-sm"
                        onClick={() =>
                          markAsRead(
                            notifications.map((n) => n.id),
                            ''
                          )
                        }
                      >
                        Mark all as read
                      </button>
                    </div>
                  )}
                </div>

                <Link href="/search" title="Search">
                  <Button
                    size="default"
                    icon={<Search />}
                    onClick={() => null}
                  />
                </Link>
                <Link
                  href="/profile"
                  title="Profile"
                  className="hidden md:block"
                >
                  <Button
                    icon={(() => {
                      const profileUrl = localStorage.getItem('profileUrl');
                      return profileUrl ? (
                        <Image
                          src={
                            profileUrl.startsWith('http') ? profileUrl : UserPng
                          }
                          alt="Profile Picture"
                          className="rounded-full object-cover"
                          height={24}
                          width={24}
                        />
                      ) : (
                        <User />
                      );
                    })()}
                    size="default"
                    onClick={() => null}
                  />
                </Link>

                <Button icon={<LogOut />} onClick={logout} size="default" />
                {!isMenuOpen && (
                  <div className="md:hidden items-center gap-4 text-[#111418]">
                    <FaBars
                      className="text-2xl cursor-pointer"
                      onClick={toggleMenu}
                      title="Open Menu"
                    />
                  </div>
                )}
              </>
            </div>
          )}
        </nav>
      </header>
      <Modal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        {view === 'login' && (
          <LoginContainer setDialogOpen={setIsLoginOpen} setView={setView} />
        )}
        {view === 'signup' && (
          <SignUpContainer
            setLoginDialogOpen={setLoginDialogOpen}
            setView={setView}
          />
        )}
        {view === 'forgot' && (
          <ForgotPasswordContainer
            setLoginDialogOpen={setLoginDialogOpen}
            setView={setView}
          />
        )}
      </Modal>
    </div>
  );
};
