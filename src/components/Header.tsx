'use client';

import { useEffect, useRef, useState } from 'react';
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
} from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import { AiTwotoneHome } from 'react-icons/ai';
import { LiaSellcast } from 'react-icons/lia';
import { IoIosHeartEmpty } from 'react-icons/io';
import Link from 'next/link';
import iconImage from '../public/images/icon.jpeg';
import { useAuth } from '@/app/context/AuthContext';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Messages } from '@/lib/messages';

const SearchButton = () => (
  <Link href="/search">
    <button className="relative cursor-pointer bg-[#f0f2f5] rounded-xl p-2.5 text-[#111418] focus:outline-none max-w-xs flex">
      <FaSearch className="text-xl" />
    </button>
  </Link>
);
export const Header = () => {
  const nodeRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authenticationToken, logout, role } = useAuth();
  const currentPath = usePathname();
  useEffect(() => {
    console.log(currentPath);
  }, [currentPath]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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

            {/* Conditionally hide SearchButton */}
            {!currentPath.includes('/search') && (
              <div className="sm:flex">
                <SearchButton />
              </div>
            )}
            <Link href="/profile">
              {/* <FaUserCircle className="text-3xl cursor-pointer" /> */}
              <Image
                src={`${(localStorage.getItem("profileUrl")!=null && localStorage.getItem("profileUrl")!='' && localStorage.getItem("profileUrl")==undefined) ? localStorage.getItem("profileUrl") :  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s'}`}
                alt="Profile Picture"
                className="rounded-full object-cover"
                height={32} // Adjusted to match `w-24` and `h-24` (96px)
                width={32}
              />
            </Link>
            <FaSignOutAlt
              className="text-3xl cursor-pointer"
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
                Campus Bazaar
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
              <IoIosHeartEmpty className="text-xl" />
              <Link href="/wishlist">
                <span className="text-sm font-medium">Wishlist</span>
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <FaSignOutAlt className="text-3xl cursor-pointer" />
              <button
                className="text-sm font-medium"
                onClick={logout}
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
