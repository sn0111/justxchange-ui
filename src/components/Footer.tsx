import React from 'react';
import { Facebook, Twitter, Instagram, ChevronRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradiant-header pt-12 w-full overflow-hidden">
      <div className="px-6 mx-auto grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {/* About Section */}
        <div className="relative group h-[18rem]">
          <div className="absolute inset-0 bg-gradiant-theme-link rounded-2xl blur opacity-50 group-hover:opacity-100 transition-all"></div>
          <div className="relative bg-black/80 p-10 rounded-2xl h-full flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-white mb-4">
              About JustXchange
            </h3>
            <p className="text-gray-300 text-base leading-relaxed">
              JustXchange is the go-to platform for students to buy, sell, and
              exchange goods and services. Join a community where you can find
              the best deals on student essentials.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="relative group h-[18rem]">
          <div className="absolute inset-0 bg-gradiant-theme-link rounded-2xl blur opacity-50 group-hover:opacity-100 transition-all"></div>
          <div className="relative bg-black/80 p-10 rounded-2xl h-full flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="text-gray-300 space-y-3 text-base leading-relaxed">
              {[
                { label: 'Home', href: '/' },
                { label: 'Browse Categories', href: '/categories' },
                { label: 'Sell Items', href: '/sell' },
                { label: 'My Account', href: '/account' },
              ].map((link, index) => (
                <li
                  key={index}
                  className="group/link flex items-center transition-transform hover:translate-x-2"
                >
                  <ChevronRight className="w-5 h-5 mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  <a
                    href={link.href}
                    className="hover:text-pink-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Support + Social Icons */}
        <div className="relative group h-[18rem]">
          <div className="absolute inset-0 bg-gradiant-theme-link rounded-2xl blur opacity-50 group-hover:opacity-100 transition-all"></div>
          <div className="relative bg-black/80 p-10 rounded-2xl h-full flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-white mb-4">Support</h3>
            <ul className="text-gray-300 space-y-3 text-base leading-relaxed">
              {[
                { label: 'Help Center', href: '/help-center' },
                { label: 'FAQs', href: '/faqs' },
                { label: 'Contact Us', href: '/contact-us' },
              ].map((item, index) => (
                <li
                  key={index}
                  className="group/link flex items-center transition-transform hover:translate-x-2"
                >
                  <ChevronRight className="w-5 h-5 mr-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  <a
                    href={item.href}
                    className="hover:text-pink-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center space-x-6 mt-6">
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-300 hover:text-pink-400 transform transition-all duration-300 hover:scale-110"
                  aria-label="Social Media"
                >
                  <Icon className="w-8 h-8" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="relative mt-4">
        <div className="absolute inset-0 bg-gradiant-theme-link rounded-lg blur opacity-50"></div>
        <div className="relative bg-black/80 px-10 py-5">
          <div className="text-center text-gray-300 text-base">
            &copy; {new Date().getFullYear()} JustXchange. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
