'use client';

import { useEffect, useRef, useState } from 'react';
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
  FaBell,
} from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import { AiTwotoneHome } from 'react-icons/ai';
import { LiaSellcast } from 'react-icons/lia';
import Link from 'next/link';
import iconImage from '../public/images/icon.jpeg';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Messages } from '@/lib/messages';
import { INotifications } from '@/interface';
import { API_URL } from '@/lib/constants';
import { io, Socket } from 'socket.io-client';
import { UserCircle } from 'lucide-react';
import { SignOut } from 'phosphor-react';

const SearchButton = () => (
  <Link href="/search">
    <button className="relative cursor-pointer bg-[#f0f2f5] rounded-xl p-2.5 text-[#111418] focus:outline-none max-w-xs flex">
      <FaSearch className="text-xl" />
    </button>
  </Link>
);
export const Header = () => {
  const [notifications, setNotifications] = useState<INotifications[]>([]);
  const auth = useAuth();
  const nodeRef = useRef(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const { authenticationToken, logout, role } = useAuth();
  const currentPath = usePathname();
   const router = useRouter();
  useEffect(() => {
    console.log(currentPath);
  }, [currentPath]);

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
        console.log(unreadNotifications)
        setNotifications(unreadNotifications);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [auth.authenticationToken]);

  const markAsRead = (notificationIds: string[],productId: string) => {
    if (socket) {
      socket.emit('mark-as-read', notificationIds);
      setNotifications((prev) =>
        prev.map((n) =>
          notificationIds.includes(n.id) ? { ...n, isRead: true } : n
        )
      );
    }
    if(productId)
      router.push(`/view?productId=${productId}`)
  };
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-4 py-3 lg:px-10">
      {/* Logo Section */}
      <div className="flex items-center gap-4 text-[#111418]">
        <Link href="/">
          <Image
            src={iconImage.src}
            alt="JustXchange logo"
            height={48}
            width={48}
          />
        </Link>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] lg:text-xl">
          JustXchange
        </h2>
      </div>

      {/* Right Menu */}
      <div className="flex items-center gap-4 flex-1 justify-end">
        {authenticationToken && (
          <>
            {role === Messages.user && (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/add-product">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    <span>Sell</span>
                  </button>
                </Link>
              </div>
            )}

        <div className="relative cursor-pointer">
          <div onClick={()=>setIsNotification(!isNotification)}>
            <FaBell className="text-2xl text-gray-700"/>
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {notifications.length}
              </span>
            )}
          </div>
          {isNotification && (
                    <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-3">
                    <h3 className="text-sm font-bold">Notifications</h3>
                    {notifications.length > 0 ? (
                      <ul>
                        {notifications.map((n) => (
                          <li
                            key={n.id}
                            className={`p-2 border-b ${
                              n.isRead ? "text-gray-400" : "font-semibold"
                            }`}
                            onClick={()=>markAsRead([n.id], n.productId)}
                          >
                            <p className="text-xs font-bold text-gray-700">{n.productName}</p>
                            <p
                              className="text-sm text-gray-500 truncate"
                              title={n.message} // Show full message on hover
                            >
                              {n.message.length > 30 ? `${n.message.substring(0, 30)}...` : n.message}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">No notifications</p>
                    )}
                    <button
                      className="mt-2 text-blue-500 text-sm"
                      onClick={()=>markAsRead(notifications.map(n=>n.id),"")}
                    >
                      Mark all as read
                    </button>
                  </div>
                  
                )}
            </div>

            {/* Conditionally hide SearchButton */}
            {!currentPath.includes('/search') && (
              <div className="sm:flex" title="Search">
                <SearchButton />
              </div>
            )}
            <Link href="/profile" title="Profile" className='hidden md:block'>
              {/* <FaUserCircle className="text-3xl cursor-pointer" /> */}
              <Image
                src={`${localStorage.getItem('profileUrl') != null && localStorage.getItem('profileUrl') != '' && localStorage.getItem('profileUrl') == undefined ? localStorage.getItem('profileUrl') : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s'}`}
                alt="Profile Picture"
                className="rounded-full object-cover"
                height={32} // Adjusted to match `w-24` and `h-24` (96px)
                width={32}
              />
            </Link>
            <FaSignOutAlt
              className="hidden md:block text-3xl cursor-pointer"
              onClick={logout}
              title="Logout"
            />
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
        )}
        {!authenticationToken && (
          <Link href="/login">
            <FaUserCircle className="text-3xl cursor-pointer" title="Login" />
          </Link>
        )}
      </div>

      {/* Mobile Slide-out Menu */}
      <CSSTransition
        in={isMenuOpen}
        timeout={300}
        classNames="menu"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div className="fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto transition-transform transform translate-x-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-[#111418]">
              <Image
                src={iconImage.src}
                alt="Campus Bazaar logo"
                height={40}
                width={40}
              />
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] lg:text-xl">
                JustXchange
              </h2>
            </div>
            <FaTimes
              className="text-2xl cursor-pointer"
              onClick={toggleMenu}
              title="Close Menu"
            />
          </div>
          <ul className="space-y-4">
            <li>
              <label className="flex w-full h-10">
                <div className="flex items-center bg-[#f0f2f5] rounded-l-xl pl-4">
                  <FaSearch className="text-lg" />
                </div>
                <input
                  placeholder="Search"
                  className="form-input w-full border-none bg-[#f0f2f5] rounded-r-xl pl-2 text-base font-normal leading-normal"
                />
              </label>
            </li>
            <li className="flex items-center gap-3">
              <AiTwotoneHome className="text-xl" />
              <Link href="/">
                <span className="text-sm font-medium">Home</span>
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <LiaSellcast className="text-xl" />
              <Link href="/add-product">
                <span className="text-sm font-medium">Sell</span>
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <UserCircle className="text-xl" />
              <Link href="/profile">
                <span className="text-sm font-medium">Profile</span>
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <SignOut className="text-xl cursor-pointer" />
              <button
                className="text-sm font-medium"
                onClick={()=>{setIsMenuOpen(false);logout()}}
                title="Logout"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </CSSTransition>
    </header>
  );
};
