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
} from 'lucide-react';
import Modal from '@/app/_components/dialog/Dialog';
import { LoginContainer } from '@/app/container/login';
import Button from './Button';
import UserPng from '@/public/images/user.png';

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
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
        <LoginContainer setDialogOpen={setIsLoginOpen} />
      </Modal>
    </div>
    // <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-4 py-3 lg:px-10">
    //   {/* Logo Section */}
    //   <div className="flex items-center gap-4 text-[#111418]">
    //     <Link href="/">
    //       <Image
    //         src={iconImage.src}
    //         alt="JustXchange logo"
    //         height={48}
    //         width={48}
    //       />
    //     </Link>
    //     <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] lg:text-xl">
    //       JustXchange
    //     </h2>
    //   </div>

    //   {/* Right Menu */}
    //   <div className="flex items-center gap-4 flex-1 justify-end">
    //     {authenticationToken && (
    //       <>
    //         {role === Messages.user && (
    //           <div className="hidden md:flex items-center gap-3">
    //             <Link href="/add-product">
    //               <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none">
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   fill="none"
    //                   viewBox="0 0 24 24"
    //                   strokeWidth={1.5}
    //                   stroke="currentColor"
    //                   className="w-5 h-5"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     d="M12 4.5v15m7.5-7.5h-15"
    //                   />
    //                 </svg>
    //                 <span>Sell</span>
    //               </button>
    //             </Link>
    //           </div>
    //         )}
    //       {role === Messages.admin && (
    //           <div className="hidden md:flex items-center gap-3">
    //             <Link href="/audit-logs">
    //             <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    //             width="22.000000pt" height="22.000000pt" viewBox="0 0 512.000000 512.000000"
    //             preserveAspectRatio="xMidYMid meet">

    //             <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
    //             fill="#000000" stroke="none">
    //             <path d="M1950 5102 c-36 -9 -87 -30 -115 -46 -73 -42 -782 -754 -818 -822
    //             -58 -110 -57 -100 -57 -935 l0 -766 -28 -69 c-134 -325 -117 -699 44 -1003
    //             l45 -85 -61 -61 -60 -61 -66 4 c-120 8 -122 7 -470 -342 -349 -349 -351 -352
    //             -342 -469 3 -35 12 -76 21 -92 8 -17 84 -98 169 -181 132 -130 159 -152 201
    //             -164 58 -16 132 -8 184 19 21 10 107 89 190 173 167 168 176 186 128 233 -47
    //             48 -64 38 -229 -124 -150 -148 -181 -169 -229 -158 -12 4 -82 66 -155 140
    //             -124 125 -132 136 -132 172 0 38 10 49 302 342 l303 303 44 0 c45 0 47 -2 178
    //             -133 129 -129 133 -134 133 -175 0 -39 -6 -49 -65 -112 -36 -38 -65 -76 -65
    //             -84 0 -43 43 -86 86 -86 9 0 47 30 84 66 89 85 114 141 108 235 l-5 67 58 58
    //             59 58 78 -42 c70 -37 204 -87 334 -123 45 -12 48 -16 68 -71 29 -80 111 -168
    //             198 -210 l67 -33 1335 0 1335 0 65 31 c80 38 128 79 168 142 67 106 63 -14 60
    //             1698 l-3 1549 -33 67 c-40 81 -129 168 -199 194 -60 21 -66 27 -87 87 -25 67
    //             -113 159 -188 197 -34 16 -67 30 -75 30 -7 0 -13 6 -13 13 0 31 -62 137 -106
    //             179 -48 45 -137 98 -167 98 -8 0 -23 24 -36 60 -25 69 -100 157 -167 196 -93
    //             55 -74 54 -1079 53 -842 0 -936 -2 -995 -17z m1970 -153 c55 -25 95 -62 123
    //             -114 l22 -40 3 -1513 c1 -1025 -1 -1526 -8 -1553 -15 -56 -68 -119 -125 -148
    //             l-49 -26 -383 -3 -382 -3 20 58 c104 298 89 624 -42 902 -163 349 -491 601
    //             -867 666 -111 20 -308 19 -413 -1 -250 -47 -436 -143 -617 -318 l-92 -89 2
    //             616 c3 608 3 616 24 644 47 63 66 68 324 73 229 5 236 6 292 32 80 37 152 107
    //             191 187 l32 65 5 236 c4 198 8 240 22 267 17 30 56 64 88 76 8 3 413 6 900 6
    //             870 1 886 0 930 -20z m-2087 -291 c-2 -112 -5 -217 -8 -234 -7 -43 -56 -108
    //             -107 -141 l-41 -28 -226 -5 c-124 -3 -228 -4 -231 -2 -4 3 602 612 610 612 3
    //             0 4 -91 3 -202z m2446 -44 c22 -19 49 -54 60 -78 21 -42 21 -48 21 -1567 l0
    //             -1524 -24 -51 c-13 -28 -39 -63 -58 -77 -77 -59 -54 -57 -717 -57 l-610 0 47
    //             70 47 70 402 0 c260 0 421 4 455 11 106 23 199 87 257 177 64 100 61 20 61
    //             1614 0 956 3 1448 10 1448 5 0 28 -16 49 -36z m312 -311 c63 -67 64 -73 67
    //             -378 3 -269 4 -281 24 -302 30 -33 80 -31 107 3 20 25 21 39 21 230 0 151 3
    //             204 12 204 25 0 104 -96 116 -141 10 -34 12 -393 10 -1565 l-3 -1521 -30 -49
    //             c-19 -30 -49 -60 -79 -79 l-49 -30 -1299 -3 -1299 -2 -49 21 c-46 20 -120 87
    //             -120 109 0 6 446 10 1238 12 l1237 3 58 24 c108 43 202 141 239 251 17 48 24
    //             2272 8 2311 -11 25 -47 49 -74 49 -8 0 -24 -9 -37 -19 l-24 -19 -5 -1134 -5
    //             -1133 -24 -48 c-30 -62 -96 -113 -164 -127 -35 -7 -345 -9 -961 -8 l-909 3 59
    //             39 c32 21 78 54 101 72 l41 34 689 0 c750 0 742 -1 840 57 56 33 120 105 152
    //             173 l26 55 3 1483 2 1482 28 -14 c15 -8 39 -27 53 -43z m-2356 -1282 c210 -44
    //             367 -130 525 -290 146 -149 218 -275 272 -479 19 -74 23 -111 22 -247 -1 -139
    //             -4 -173 -26 -256 -62 -231 -192 -425 -375 -563 -320 -240 -738 -279 -1091
    //             -102 -644 324 -768 1184 -242 1679 138 130 307 218 490 257 117 25 306 26 425
    //             1z m-1047 -1850 l79 -79 -43 -43 -44 -43 -80 79 -80 79 42 43 c23 24 43 43 44
    //             43 2 0 38 -36 82 -79z"/>
    //             <path d="M1575 3948 c-19 -17 -53 -94 -126 -285 -104 -276 -109 -298 -66 -328
    //             48 -33 104 -4 127 64 l13 41 102 0 102 0 13 -41 c30 -89 118 -107 149 -31 11
    //             27 4 52 -85 288 -102 272 -125 314 -179 314 -13 0 -36 -10 -50 -22z m81 -332
    //             c6 -24 4 -26 -30 -26 -41 0 -42 0 -19 66 l17 49 12 -31 c7 -17 16 -43 20 -58z"/>
    //             <path d="M1985 3945 c-25 -24 -25 -25 -25 -230 0 -228 5 -253 63 -313 119
    //             -125 330 -98 410 51 20 38 22 60 25 232 4 210 -3 255 -43 273 -36 17 -48 15
    //             -79 -9 l-26 -20 0 -189 c0 -104 -4 -200 -10 -214 -11 -30 -57 -56 -99 -56 -17
    //             0 -42 11 -60 26 l-31 26 0 199 c0 199 0 200 -25 224 -13 14 -36 25 -50 25 -14
    //             0 -37 -11 -50 -25z"/>
    //             <path d="M2588 3950 l-28 -21 0 -284 0 -284 28 -21 c25 -20 36 -22 142 -18 94
    //             3 123 8 156 25 57 30 119 104 141 166 21 61 23 191 5 254 -20 68 -71 133 -132
    //             167 -51 29 -63 31 -170 34 -106 4 -117 2 -142 -18z m263 -168 c64 -72 64 -202
    //             0 -274 -23 -26 -37 -32 -84 -36 l-57 -4 0 177 0 177 57 -4 c47 -4 61 -10 84
    //             -36z"/>
    //             <path d="M3166 3949 l-26 -20 0 -284 c0 -279 0 -285 22 -305 45 -41 111 -13
    //             123 53 4 18 5 144 3 280 l-3 249 -28 24 c-34 29 -56 30 -91 3z"/>
    //             <path d="M3425 3945 c-30 -30 -32 -64 -4 -99 17 -22 28 -26 70 -26 l49 0 0
    //             -229 0 -230 26 -20 c43 -34 86 -26 109 20 12 22 15 74 15 244 l0 215 45 0 c56
    //             0 85 25 85 74 0 25 -7 40 -26 55 -24 19 -40 21 -186 21 -155 0 -159 -1 -183
    //             -25z"/>
    //             <path d="M1895 2859 c-167 -24 -332 -106 -459 -228 -180 -173 -266 -374 -266
    //             -622 0 -337 183 -629 484 -774 140 -67 196 -80 371 -80 177 0 254 18 395 90
    //             201 104 348 276 419 491 203 609 -307 1215 -944 1123z m330 -169 c122 -38 202
    //             -87 295 -180 130 -130 188 -247 210 -421 36 -291 -121 -581 -385 -714 -246
    //             -124 -547 -93 -759 78 -126 101 -217 243 -252 394 -25 105 -15 284 20 388 83
    //             241 283 417 536 471 90 19 245 11 335 -16z"/>
    //             <path d="M2231 2476 c-66 -24 -106 -70 -196 -230 -118 -209 -103 -196 -147
    //             -138 -65 88 -189 127 -281 89 -113 -48 -174 -184 -133 -298 11 -32 248 -349
    //             315 -422 69 -76 195 -96 282 -45 24 14 52 34 61 44 22 26 383 666 397 705 15
    //             44 14 123 -2 162 -48 112 -184 174 -296 133z m134 -161 c46 -45 39 -64 -160
    //             -415 -150 -265 -189 -327 -214 -339 -48 -23 -79 -2 -168 112 -196 254 -213
    //             278 -213 308 0 42 39 79 83 79 38 0 60 -20 150 -137 28 -36 59 -66 73 -69 58
    //             -15 67 -5 196 224 67 119 133 227 145 240 30 30 77 29 108 -3z"/>
    //             </g>
    //             </svg>
    //             </Link>
    //           </div>
    //         )}
    //     <div className="relative cursor-pointer">
    //       <div onClick={()=>setIsNotification(!isNotification)}>
    //         <FaBell className="text-2xl text-gray-700"/>
    //         {notifications.length > 0 && (
    //           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
    //             {notifications.length}
    //           </span>
    //         )}
    //       </div>
    //       {isNotification && (
    //                 <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-3">
    //                 <h3 className="text-sm font-bold">Notifications</h3>
    //                 {notifications.length > 0 ? (
    //                   <ul>
    //                     {notifications.map((n) => (
    //                       <li
    //                         key={n.id}
    //                         className={`p-2 border-b ${
    //                           n.isRead ? "text-gray-400" : "font-semibold"
    //                         }`}
    //                         onClick={()=>markAsRead([n.id], n.productId)}
    //                       >
    //                         <p className="text-xs font-bold text-gray-700">{n.productName}</p>
    //                         <p
    //                           className="text-sm text-gray-500 truncate"
    //                           title={n.message} // Show full message on hover
    //                         >
    //                           {n.message.length > 30 ? `${n.message.substring(0, 30)}...` : n.message}
    //                         </p>
    //                       </li>
    //                     ))}
    //                   </ul>
    //                 ) : (
    //                   <p className="text-sm text-gray-500">No notifications</p>
    //                 )}
    //                 <button
    //                   className="mt-2 text-blue-500 text-sm"
    //                   onClick={()=>markAsRead(notifications.map(n=>n.id),"")}
    //                 >
    //                   Mark all as read
    //                 </button>
    //               </div>

    //             )}
    //         </div>

    //         {/* Conditionally hide SearchButton */}
    //         {!currentPath.includes('/search') && (
    //           <div className="sm:flex" title="Search">
    //             <SearchButton />
    //           </div>
    //         )}
    //         <Link href="/profile" title="Profile" className='hidden md:block'>
    //           {/* <FaUserCircle className="text-3xl cursor-pointer" /> */}
    //           <Image
    //             src={`${localStorage.getItem('profileUrl') != null && localStorage.getItem('profileUrl') != '' && localStorage.getItem('profileUrl') == undefined ? localStorage.getItem('profileUrl') : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s'}`}
    //             alt="Profile Picture"
    //             className="rounded-full object-cover"
    //             height={32} // Adjusted to match `w-24` and `h-24` (96px)
    //             width={32}
    //           />
    //         </Link>
    //         <FaSignOutAlt
    //           className="hidden md:block text-3xl cursor-pointer"
    //           onClick={logout}
    //           title="Logout"
    //         />
    //         {!isMenuOpen && (
    //           <div className="md:hidden items-center gap-4 text-[#111418]">
    //             <FaBars
    //               className="text-2xl cursor-pointer"
    //               onClick={toggleMenu}
    //               title="Open Menu"
    //             />
    //           </div>
    //         )}
    //       </>
    //     )}
    //     {!authenticationToken && (
    //       <Link href="/welcome">
    //         <FaUserCircle className="text-3xl cursor-pointer" title="Login" />
    //       </Link>
    //     )}
    //   </div>

    //   {/* Mobile Slide-out Menu */}
    //   <CSSTransition
    //     in={isMenuOpen}
    //     timeout={300}
    //     classNames="menu"
    //     unmountOnExit
    //     nodeRef={nodeRef}
    //   >
    //     <div className="fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto transition-transform transform translate-x-0">
    //       <div className="flex items-center justify-between mb-4">
    //         <div className="flex items-center gap-4 text-[#111418]">
    //           <Image
    //             src={iconImage.src}
    //             alt="Campus Bazaar logo"
    //             height={40}
    //             width={40}
    //           />
    //           <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] lg:text-xl">
    //             JustXchange
    //           </h2>
    //         </div>
    //         <FaTimes
    //           className="text-2xl cursor-pointer"
    //           onClick={toggleMenu}
    //           title="Close Menu"
    //         />
    //       </div>
    //       <ul className="space-y-4">
    //         <li>
    //           <label className="flex w-full h-10">
    //             <div className="flex items-center bg-[#f0f2f5] rounded-l-xl pl-4">
    //               <FaSearch className="text-lg" />
    //             </div>
    //             <input
    //               placeholder="Search"
    //               className="form-input w-full border-none bg-[#f0f2f5] rounded-r-xl pl-2 text-base font-normal leading-normal"
    //             />
    //           </label>
    //         </li>
    //         <li className="flex items-center gap-3">
    //           <AiTwotoneHome className="text-xl" />
    //           <Link href="/">
    //             <span className="text-sm font-medium">Home</span>
    //           </Link>
    //         </li>
    //         <li className="flex items-center gap-3">
    //           <LiaSellcast className="text-xl" />
    //           <Link href="/add-product">
    //             <span className="text-sm font-medium">Sell</span>
    //           </Link>
    //         </li>
    //         <li className="flex items-center gap-3">
    //           <UserCircle className="text-xl" />
    //           <Link href="/profile">
    //             <span className="text-sm font-medium">Profile</span>
    //           </Link>
    //         </li>
    //         <li className="flex items-center gap-3">
    //           <SignOut className="text-xl cursor-pointer" />
    //           <button
    //             className="text-sm font-medium"
    //             onClick={()=>{setIsMenuOpen(false);logout()}}
    //             title="Logout"
    //           >
    //             Logout
    //           </button>
    //         </li>
    //       </ul>
    //     </div>
    //   </CSSTransition>
    // </header>
  );
};
