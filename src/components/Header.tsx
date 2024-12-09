'use client';
import { useState } from 'react';
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
} from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group'; // Import CSS Transition
import { AiTwotoneHome } from 'react-icons/ai';
import { LiaSellcast } from 'react-icons/lia';
import { IoIosHeartEmpty } from 'react-icons/io';
import Link from 'next/link';
import iconImage from '../public/images/icon.jpeg';
import { useAuth } from '@/app/context/AuthContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  // Toggle function to handle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-4 py-3 lg:px-10">
      <div className="flex items-center gap-4 text-[#111418]">
        <Link href="/" className="">
          <img src={iconImage.src} alt="#" height="48" width="48" />
        </Link>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] lg:text-xl">
          JustXchange
        </h2>
      </div>

      <div className="flex items-center gap-4 flex-1 justify-end">
        {isAuthenticated && (
          <>
            <div className="hidden md:flex items-center gap-3">
              <a
                className="text-[#141C24] text-sm font-medium leading-normal"
                href="/add-product"
              >
                Sell
              </a>
              <a
                className="text-[#141C24] text-sm font-medium leading-normal"
                href="#"
              >
                Wishlist
              </a>
            </div>
            <Link href="/search" className="md:hidden sm:flex max-w-xs">
              <button className="relative cursor-pointer bg-[#f0f2f5] rounded-xl p-2.5 text-[#111418] focus:outline-none">
                <FaSearch className="text-xl" />
              </button>
            </Link>
            <div className="hidden md:flex w-full max-w-xs">
              <label className="flex w-full h-10">
                <div className="flex items-center bg-[#f0f2f5] rounded-l-xl pl-4">
                  <FaSearch className="text-lg" />
                </div>
                <input
                  placeholder="Search"
                  className="form-input w-full border-none bg-[#f0f2f5] rounded-r-xl pl-2 text-base font-normal leading-normal"
                />
              </label>
            </div>
            <Link href="/profile">
              <FaUserCircle className="text-3xl cursor-pointer" />
            </Link>

            <FaSignOutAlt
              className="text-3xl cursor-pointer"
              onClick={logout}
            />

            {!isMenuOpen && (
              <div className="md:hidden items-center gap-4 text-[#111418]">
                <FaBars
                  className="text-2xl cursor-pointer"
                  onClick={toggleMenu}
                />
              </div>
            )}
          </>
        )}
        {!isAuthenticated && (
          <FaUserCircle className="text-3xl cursor-pointer" />
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
              <div className="size-4">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] lg:text-xl">
                Campus Bazaar
              </h2>
            </div>
            <FaTimes className="text-2xl cursor-pointer" onClick={toggleMenu} />
          </div>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
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
              <a href="/" className="text-sm font-medium">
                Home
              </a>
            </li>
            <li className="flex items-center gap-3">
              <LiaSellcast className="text-xl" />
              <a href="/add-product" className="text-sm font-medium">
                Sell
              </a>
            </li>
            <li className="flex items-center gap-3">
              <IoIosHeartEmpty className="text-xl" />
              <a href="#" className="text-sm font-medium">
                Whishlist
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaSignOutAlt className="text-3xl cursor-pointer" />
              <a href="#" className="text-sm font-medium" onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </CSSTransition>
    </header>
  );
};
