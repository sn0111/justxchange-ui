import React from 'react';
import Link from 'next/link';
import { CaretRight, Flag, Bookmark, ChatCircle } from 'phosphor-react';

interface IProductDetails {
  images: string[];
  currentIndex: number;
  goToPrevious: () => void;
  goToNext: () => void;
}

const ProductDetails = ({
  images,
  currentIndex,
  goToPrevious,
  goToNext,
}: IProductDetails) => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden">
      <h2 className="pl-6 text-[#0d141c] text-[22px] font-bold leading-tight tracking-[-0.015em]">
        Dorm Bedding Set
      </h2>
      <div className="flex flex-col md:flex-row w-full p-6">
        <div
          className="relative md:h-full w-[100%] md:w-2/3 bg-center bg-no-repeat bg-cover aspect-[3/2] rounded-xl"
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
          }}
        >
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <button
              onClick={goToPrevious}
              className="w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-500"
            ></button>

            {/* You can map through the images array to dynamically create dots if needed */}
            {images.map((_, index) => (
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
            Brand new, never used. Twin XL comforter, sheet set, and pillow
            case.
          </p>

          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:gap-4">
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pr-2">
              <p className="text-[#49719c] text-sm font-normal leading-normal">
                Price
              </p>
              <p className="text-[#0d141c] text-sm font-normal leading-normal">
                $50
              </p>
            </div>
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pl-2">
              <p className="text-[#49719c] text-sm font-normal leading-normal">
                Condition
              </p>
              <p className="text-[#0d141c] text-sm font-normal leading-normal">
                New
              </p>
            </div>
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pr-2">
              <p className="text-[#49719c] text-sm font-normal leading-normal">
                Brand
              </p>
              <p className="text-[#0d141c] text-sm font-normal leading-normal">
                Pottery Barn
              </p>
            </div>
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pl-2">
              <p className="text-[#49719c] text-sm font-normal leading-normal">
                Size
              </p>
              <p className="text-[#0d141c] text-sm font-normal leading-normal">
                Twin XL
              </p>
            </div>
            <div className="flex flex-col gap-1 border-t border-solid border-t-[#cedbe8] py-4 pr-2 col-span-2">
              <p className="text-[#49719c] text-sm font-normal leading-normal">
                Color
              </p>
              <p className="text-[#0d141c] text-sm font-normal leading-normal">
                Gray
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 px-4 min-h-14 justify-between">
            <div className="flex items-center gap-4">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-10"
                style={{
                  backgroundImage:
                    'url("https://cdn.usegalileo.ai/stability/d7346a7c-e147-4fe0-a4d5-3a030d2d74bf.png");',
                }}
              ></div>
              <p className="text-[#0d141c] text-base font-normal leading-normal flex-1 truncate">
                View seller&apos;s profile
              </p>
            </div>
            <div className="shrink-0">
              <CaretRight size={24} color="#0d141c" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex px-4 py-3 justify-end">
        <div className="px-3">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7edf4] text-[#0d141c] gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]">
            <Flag size={20} color="#0d141c" />
            <span className="truncate">Report</span>
          </button>
        </div>
        <div className="px-3">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7edf4] text-[#0d141c] gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]">
            <Bookmark size={20} color="#0d141c" />
            <span className="truncate">Save</span>
          </button>
        </div>
        <div className="px-3">
          <Link
            href="/chat"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#2589f4] text-white gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <ChatCircle size={20} color="white" />
            <span className="truncate">Message</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
