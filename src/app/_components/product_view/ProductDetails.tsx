import React from 'react';
import Link from 'next/link';
import { CaretRight, Flag, Bookmark, ChatCircle, X } from 'phosphor-react';
import { IProduct } from '@/interface';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Messages } from '@/lib/messages';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
      <h2 className="pl-6 text-[#0d141c] text-[22px] font-bold leading-tight tracking-[-0.015em] pt-3">
        {product?.productName}
      </h2>
      <div className="flex flex-col md:flex-row w-full p-6 pt-3">
      <div
          className="relative md:h-full w-[100%] md:w-2/3 bg-center bg-no-repeat bg-cover aspect-[3/2] rounded-xl"
          style={{
            backgroundImage: `url(${product?.images && product?.images[currentIndex]})`,
          }}
        >
          <div className="absolute inset-0 flex justify-between items-center">
            <motion.button
              onClick={goToPrevious}
              className="bg-gray-300 rounded-full p-2 hover:bg-gray-500"
              whileHover={{ scale: 1.1 }} // Animation on hover
              whileTap={{ scale: 0.9 }} // Animation on tap
            >
              <ArrowLeft size={24} color="#0d141c" />
            </motion.button>
            <motion.button
              onClick={goToNext}
              className="bg-gray-300 rounded-full p-2 hover:bg-gray-500"
              whileHover={{ scale: 1.1 }} // Animation on hover
              whileTap={{ scale: 0.9 }} // Animation on tap
            >
              <ArrowRight size={24} color="#0d141c" />
            </motion.button>
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {product?.images &&
              product.images.map((_, index) => (
                <span
                  key={index}
                  className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-gray-500' : 'bg-gray-300'}`}
                ></span>
              ))}
          </div>
        </div>

        <div className="layout-content-container flex flex-col md:w-1/3 flex-1 mt-4 md:mt-0 md:ml-6">
          <p className="text-[#0d141c] text-base font-normal leading-normal pb-3 pt-2 px-4">
            {product?.description}
          </p>

          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:gap-4">
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pr-2">
              <p className="text-[#49719c] text-sm font-medium leading-normal">
                Price
              </p>
              <p className="text-[#0d141c] text-sm font-medium leading-normal">
                {product?.amount}
              </p>
            </div>
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pl-2">
              <p className="text-[#49719c] text-sm font-medium leading-normal">
                Condition
              </p>
              <p className="text-[#0d141c] text-sm font-medium leading-normal">
                {product?.condition}
              </p>
            </div>
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pr-2">
              <p className="text-[#49719c] text-sm font-medium leading-normal">
                Brand
              </p>
              <p className="text-[#0d141c] text-sm font-medium leading-normal">
                {product.brand || 'None'}
              </p>
            </div>
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pl-2">
              <p className="text-[#49719c] text-sm font-medium leading-normal">
                Size
              </p>
              <p className="text-[#0d141c] text-sm font-medium leading-normal">
                {product.size || 'None'}
              </p>
            </div>
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pr-2 col-span-2">
              <p className="text-[#49719c] text-sm font-medium leading-normal">
                Color
              </p>
              <p className="text-[#0d141c] text-sm font-medium leading-normal">
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
                alt="User  Profile"
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-10"
              />
              <p className="text-[#0d141c] text-base font-medium leading-normal flex-1 truncate">
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
                  alt="User  Profile"
                  className="w-32 h-32 rounded-full shadow-md"
                />
              </div>
              <hr className="border-t border-gray-200 my-2" />
              <div className="flex items-center mb-3">
                <p className="text-sm font-medium text-[#49719c] min-w-16">
                  Name
                </p>
                <p className="text-sm text-[#0d141c]">
                  {product?.user.firstName}
                </p>
              </div>
              <hr className="border-t border-gray-200 my-2" />

              <div className="flex items-center mb-3">
                <p className="text-sm font-medium text-[#49719c] min-w-16">
                  Email
                </p>
                <p className="text-sm text-[#0d141c] word-wrap">
                  {product?.user.email}
                </p>
              </div>
              <hr className="border-t border-gray-200 my-2" />

              <div className="flex items-center">
                <p className="text-sm font-medium text-[#49719c] min-w-16">
                  Phone
                </p>
                <p className="text-sm text-[#0d141c]">
                  {product?.user.address.length > 0 && product?.user.isContactView &&
                    product?.user.address[0].mobileNumber}
                </p>
              </div>
              <hr className="border-t border-gray-200 my-2" />

              <div className="flex items-center">
                <p className="text-sm font-medium text-[#49719c] min-w-16">
                  College
                </p>
                <p className="text-sm text-[#0d141c]">
                  {product?.user.college}
                </p>
              </div>
              <hr className="border-t border-gray-200 my-2" />

              <div className="flex">
                <p className="text-sm font-medium text-[#49719c] min-w-16">
                  Address
                </p>
                <p className="text-sm text-[#0d141c] max-w-[188px]">
                  {product?.user.address.length > 0 &&
                    product?.user.address[0].address}{' '}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-row sm:flex px-4 py-3 justify-end">
        <div className="pb-2 pr-2 sm:px-2 flex">
          <button className={`
            flex min-w-[84px] ml-auto max-w-[480px] cursor-pointer items-center justify-center 
            overflow-hidden rounded-xl h-10 px-4 
            bg-gradient-to-r from-[#0d141c] to-[#1a202c] text-white 
            gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em] 
            hover:from-[#1a202c] hover:to-[#0d141c] transition duration-200
          `}>
            <Flag size={20} color="white" />
            <span className="truncate">Report</span>
          </button>
        </div>
  {role === Messages.user && (
    <>
      <div className="pb-2 pr-2 sm:px-2">
        <button
          onClick={() => addToWishlist(product.id)}
          className={`
            flex min-w-[84px] ml-auto max-w-[480px] cursor-pointer items-center justify-center 
            overflow-hidden rounded-xl h-10 px-4 
            bg-gradient-to-r from-[#0d141c] to-[#1a202c] text-white 
            gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em] 
            hover:from-[#1a202c] hover:to-[#0d141c] transition duration-200
          `}
        >
          <Bookmark size={20} color="white" />
          <span className="truncate">Save</span>
        </button>
      </div>
      <div className="pr-2 sm:px-2">
        <Link
          href={`/chat`}
          className={`
            flex w-[130px] ml-auto cursor-pointer items-center justify-center 
            overflow-hidden rounded-xl h-10 
            bg-gradiant-theme text-white 
            gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em] 
            hover:bg-gradiant-theme-btn transition duration-200
          `}
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
