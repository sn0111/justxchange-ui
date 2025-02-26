'use client';

import { useEffect, useRef, useState } from 'react';
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
  Menu,
  X,
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
  const menuRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsNotification(false);
      }
    }

    if (isNotification) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotification, setIsNotification]);

  useEffect(() => {
    console.log(currentPath);
  }, [currentPath]);

  useEffect(() => {
    !isLoginOpen && setView('login');
  }, [isLoginOpen]);

  useEffect(() => {
    const socket = io(API_URL, {
      transports: ['websocket', 'polling'],
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

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsNotification(false);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClose = (event: Event) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClose);
      document.addEventListener('scroll', handleClose, { passive: true });
    } else {
      document.removeEventListener('mousedown', handleClose);
      document.removeEventListener('scroll', handleClose);
    }

    return () => {
      document.removeEventListener('mousedown', handleClose);
      document.removeEventListener('scroll', handleClose);
    };
  }, [isMenuOpen]);

  return (
    <div>
      <div className="absolute top-0 w-full h-16 bg-gradiant-header"></div>
      <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
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
              <Button
                onClick={() => null}
                iconClassName="sm:ml-2"
                icon={<Mail />}
              >
                <span className="hidden sm:inline">Contact</span>
              </Button>
            </div>
          )}

          {authenticationToken && (
            <div className="flex items-center gap-4 flex-1 justify-end">
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
                    <Button icon={<CalendarCog />} size="default" />
                  </Link>
                </div>
              )}
              <div className="relative">
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
                            <p className="text-sm text-gray-500 truncate">
                              {n.message.length > 30
                                ? `${n.message.substring(0, 30)}...`
                                : n.message}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No notifications</p>
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
                <Button size="default" icon={<Search />} onClick={() => null} />
              </Link>

              <Link href="/profile" title="Profile" className="hidden md:block">
                <Button
                  icon={<User />}
                  // icon={(() => {
                  //   const profileUrl = localStorage.getItem('profileUrl');
                  //   return profileUrl ? (
                  //     <Image
                  //       src={
                  //         profileUrl.startsWith('http') ? profileUrl : UserPng
                  //       }
                  //       alt="Profile Picture "
                  //       className=" rounded-2xl h-[30px] w-[30px]"
                  //       height={34}
                  //       width={34}
                  //     />
                  //   ) : (
                  //     <User />
                  //   );
                  // })()}
                  size="default"
                  onClick={() => null}
                />
              </Link>

              <Button
                icon={<LogOut />}
                onClick={logout}
                size="default"
                className="hidden md:flex"
              />

              <span
                onClick={toggleMenu}
                className="md:hidden"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <Button icon={<X />} size="default" />
                ) : (
                  <Button icon={<Menu />} size="default" />
                )}
              </span>

              {/* Mobile Menu Overlay */}
              <div
                ref={menuRef}
                className={`md:hidden fixed inset-0 bg-gradiant-header  backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
                  isMenuOpen
                    ? 'opacity-100 pointer-events-auto bg-gradiant-header'
                    : 'opacity-0 pointer-events-none'
                }`}
                style={{ top: '60px' }}
              >
                <div
                  className={`flex p-4 pb-[1.4rem] gap-4 flex-wrap bg-gradiant-header transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                  }`}
                >
                  {role === Messages.user && (
                    <Link href="/add-product" className="md:hidden">
                      <Button icon={<Plus />} onClick={handleMenuItemClick}>
                        Sell
                      </Button>
                    </Link>
                  )}
                  {role === Messages.admin && (
                    <Link href="/audit-logs" className="md:hidden">
                      <Button
                        icon={<CalendarCog />}
                        onClick={handleMenuItemClick}
                      >
                        Audit Logs
                      </Button>
                    </Link>
                  )}
                  <Link href="/profile" className="md:hidden">
                    <Button
                      onClick={handleMenuItemClick}
                      icon={<User />}
                      // icon={(() => {
                      //   const profileUrl = localStorage.getItem('profileUrl');
                      //   return profileUrl ? (
                      //     <Image
                      //       src={
                      //         profileUrl.startsWith('http')
                      //           ? profileUrl
                      //           : UserPng
                      //       }
                      //       alt="Profile Picture"
                      //       className="rounded-full object-cover"
                      //       height={24}
                      //       width={24}
                      //     />
                      //   ) : (
                      //     <User />
                      //   );
                      // })()}
                    >
                      Profile
                    </Button>
                  </Link>
                  <Button
                    icon={<Mail />}
                    onClick={() => {
                      handleMenuItemClick();
                      // Add your contact handling here
                    }}
                  >
                    Contact
                  </Button>
                  <Button icon={<LogOut />} onClick={logout}>
                    Logout
                  </Button>
                  {isNotification && (
                    <div
                      ref={popupRef}
                      className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-3"
                    >
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
              </div>
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
