'use client';

import { useEffect, useState } from 'react';
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

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authenticationToken, logout } = useAuth();

  useEffect(() => {
    console.log(authenticationToken);
  }, [authenticationToken]);

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
            <div className="hidden md:flex items-center gap-3">
              <Link href="/add-product">
                <span className="text-[#141C24] text-sm font-medium leading-normal">
                  Sell
                </span>
              </Link>
              <Link href="/wishlist">
                <span className="text-[#141C24] text-sm font-medium leading-normal">
                  Wishlist
                </span>
              </Link>
            </div>
            <Link href="/search">
              <span className="md:hidden sm:flex max-w-xs">
                <button className="relative cursor-pointer bg-[#f0f2f5] rounded-xl p-2.5 text-[#111418] focus:outline-none">
                  <FaSearch className="text-xl" />
                </button>
              </span>
            </Link>
            <div className="hidden md:flex w-full max-w-xs">
              <Link href="/search">
                <span>
                  <button className="relative cursor-pointer bg-[#f0f2f5] rounded-xl p-2.5 text-[#111418] focus:outline-none">
                    <FaSearch className="text-xl" />
                  </button>
                </span>
              </Link>
            </div>
            <FaUserCircle className="text-3xl cursor-pointer" />
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
