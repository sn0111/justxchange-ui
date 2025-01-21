import React from 'react';
import Link from 'next/link';
import { CaretRight, Flag, Bookmark, ChatCircle, X } from 'phosphor-react';
import { IProduct } from '@/interface';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Messages } from '@/lib/messages';

interface IProductDetails {
  product: IProduct;
  currentIndex: number;
  goToPrevious: () => void;
  goToNext: () => void;
  addToWishlist: (productUuid: string) => void;
  billerView: boolean;
  setBillerView: (billerView: boolean) => void;
  role: string;
}

const ProductDetails = ({
  product,
  currentIndex,
  goToPrevious,
  goToNext,
  addToWishlist,
  billerView,
  setBillerView,
  role,
}: IProductDetails) => {
  const popupVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: { ease: 'easeInOut', duration: 0.3 },
    },
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden">
      <h2 className="pl-6 text-[#0d141c] text-[22px] font-bold leading-tight tracking-[-0.015em]">
        {product?.productName}
      </h2>
      <div className="flex flex-col md:flex-row w-full p-6">
        <div
          className="relative md:h-full w-[100%] md:w-2/3 bg-center bg-no-repeat bg-cover aspect-[3/2] rounded-xl"
          style={{
            backgroundImage: `url(${product?.images && product?.images[currentIndex]})`,
          }}
        >
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <button
              onClick={goToPrevious}
              className="w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-500"
            ></button>

            {/* You can map through the images array to dynamically create dots if needed */}

            {product?.images &&
              product.images.map((_, index) => (
                <span
                  key={index}
                  className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-gray-500' : 'bg-gray-300'}`}
                ></span>
              ))}

            <button
              onClick={goToNext}
              className="w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-500"
            ></button>
          </div>
        </div>

        <div className="layout-content-container flex flex-col md:w-1/3 flex-1 mt-4 md:mt-0 md:ml-6">
          <p className="text-[#0d141c] text-base font-normal leading-normal pb-3 pt-2 px-4">
            {product?.description}
          </p>

          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:gap-4">
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pr-2">
              <p className="text-[#49719c] text-sm font-normal leading-normal">
                Price
              </p>
              <p className="text-[#0d141c] text-sm font-normal leading-normal">
                {product?.amount}
              </p>
            </div>
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pl-2">
              <p className="text-[#49719c] text-sm font-normal leading-normal">
                Condition
              </p>
              <p className="text-[#0d141c] text-sm font-normal leading-normal">
                {product?.condition}
              </p>
            </div>
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pr-2">
              <p className="text-[#49719c] text-sm font-normal leading-normal">
                Brand
              </p>
              <p className="text-[#0d141c] text-sm font-normal leading-normal">
                {product.brand || 'None'}
              </p>
            </div>
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pl-2">
              <p className="text-[#49719c] text-sm font-normal leading-normal">
                Size
              </p>
              <p className="text-[#0d141c] text-sm font-normal leading-normal">
                {product.size || 'None'}
              </p>
            </div>
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pr-2 col-span-2">
              <p className="text-[#49719c] text-sm font-normal leading-normal">
                Color
              </p>
              <p className="text-[#0d141c] text-sm font-normal leading-normal">
                {product.color || 'None'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 px-4 min-h-14 justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={
                  product?.user.profileUrl ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s'
                }
                width={36}
                height={36}
                alt="User Profile"
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-10"
              />
              <p className="text-[#0d141c] text-base font-normal leading-normal flex-1 truncate">
                View seller&apos;s profile
              </p>
            </div>
            <div className="shrink-0">
              <CaretRight
                size={24}
                color="#0d141c"
                onClick={() => setBillerView(true)}
                className="hover:cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Popup View */}
      <AnimatePresence>
        {billerView && (
          <motion.div
            className="fixed top-0 right-0 w-[300px] h-full bg-white shadow-lg z-50 p-6"
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="fixed top-0 right-0 w-[300px] h-full bg-white shadow-lg z-50 p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#0d141c]">
                  Seller&apos;s Profile
                </h3>
                <X
                  size={24}
                  color="#0d141c"
                  onClick={() => setBillerView(false)}
                  className="cursor-pointer"
                />
              </div>
              <div className="mt-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
                <div className="flex justify-center mb-4">
                  <Image
                    src={
                      product?.user.profileUrl ||
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s'
                    }
                    width={36}
                    height={36}
                    alt="User Profile"
                    className="w-32 h-32 rounded-full shadow-md"
                  />
                </div>
                <hr className="border-t border-gray-200 my-2" />
                <div className="flex items-center mb-3">
                  <p className="text-sm font-medium text-gray-700 min-w-16">
                    Name
                  </p>
                  <p className="text-sm text-gray-600">
                    {product?.user.firstName}
                  </p>
                </div>
                <hr className="border-t border-gray-200 my-2" />

                <div className="flex items-center mb-3">
                  <p className="text-sm font-medium text-gray-700 min-w-16">
                    Email
                  </p>
                  <p className="text-sm text-gray-600 word-wrap">
                    {product?.user.email}
                  </p>
                </div>
                <hr className="border-t border-gray-200 my-2" />

                <div className="flex items-center">
                  <p className="text-sm font-medium text-gray-700 min-w-16">
                    Phone
                  </p>
                  <p className="text-sm text-gray-600">
                    {product?.user.address.length > 0 && product?.user.isContactView &&
                      product?.user.address[0].mobileNumber}
                  </p>
                </div>
                <hr className="border-t border-gray-200 my-2" />

                <div className="flex items-center">
                  <p className="text-sm font-medium text-gray-700 min-w-16">
                    College
                  </p>
                  <p className="text-sm text-gray-600">
                    {product?.user.college}
                  </p>
                </div>
                <hr className="border-t border-gray-200 my-2" />

                <div className="flex">
                  <p className="text-sm font-medium text-gray-700 min-w-16">
                    Address
                  </p>
                  <p className="text-sm text-gray-600 max-w-[188px]">
                    {product?.user.address.length > 0 &&
                      product?.user.address[0].address}{' '}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-row sm:flex px-4 py-3 justify-end">
        <div className="pb-2 pr-2 sm:px-2 flex">
          <button className="flex min-w-[84px] ml-auto max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7edf4] text-[#0d141c] gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]">
            <Flag size={20} color="#0d141c" />
            <span className="truncate">Report</span>
          </button>
        </div>
        {role === Messages.user && (
          <>
            <div className="pb-2 pr-2 sm:px-2">
              <button
                onClick={() => addToWishlist(product.id)}
                className="flex min-w-[84px] ml-auto max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7edf4] text-[#0d141c] gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <Bookmark size={20} color="#0d141c" />
                <span className="truncate">Save</span>
              </button>
            </div>
            <div className="pr-2 sm:px-2">
              <Link
                href={`/chat`}
                className="flex w-[130px] ml-auto cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#2589f4] text-white gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <ChatCircle size={20} color="white" />
                <span className="truncate">Message</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
