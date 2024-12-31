import Pagination from '@/components/Pagination';
import { IProduct } from '@/interface';
import { formatProductDate } from '@/lib/utils';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';
import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { IoIosChatbubbles } from 'react-icons/io';

interface IUserProducts {
  products: IProduct[];
  router: AppRouterInstance;
  selectPage: (pageNumber: number) => void;
  selectedPage: number;
}

const UserProducts = ({
  products,
  router,
  selectPage,
  selectedPage,
}: IUserProducts) => {
  return (
    <main className="flex-1 p-4 lg:p-6 bg-gray-50">
      {/* Header */}
      {/* <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 lg:mb-8">
        <h2 className="text-2xl font-semibold mb-2 lg:mb-0">My Listings</h2>
        <button className="bg-gray-200 text-black px-3 py-2 rounded-lg hover:bg-gray-300">
          Create new listing
        </button>
      </div> */}

      {/* Listings */}
      <div className=" max-h-[70vh] min-h-[70vh] ">
        <div className="space-y-4 max-h-[62vh] min-h-[62vh] overflow-y-scroll">
          {products.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-between items-start sm:items-center p-2 bg-white rounded-lg space-y-2 sm:space-y-0"
            >
              <div className="flex items-center gap-4">
                <Image
                  className="w-12 h-12 rounded-md object-cover"
                  src={item.images[0]}
                  alt={item.productName}
                  width={48}
                  height={48}
                />
                <div>
                  <p className="text-lg font-medium">
                    {item.productName} ₹{item.amount}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatProductDate(item.createdDate)}
                  </p>
                </div>
              </div>
              <div className='flex'>
                <div className='pr-3'>
                <FaInfoCircle
                  className="text-xl cursor-pointer"
                  onClick={() =>
                    router.push(`/add-product?productId=${item.id}`)
                  }
                />
                </div>
                <div className='pr-3'>
                <IoIosChatbubbles
                  className="text-xl cursor-pointer"
                  onClick={() =>
                    router.push(`/chat?productId=${item.id}`)
                  }
                />
                </div>
              </div>
              {/* <p className="text-lg font-medium">{item.amount}</p> */}
            </div>
          ))}
        </div>
        <div className="pt-3">
          {Math.ceil(products.length / 10) > 0 && (
            <Pagination
              count={Math.ceil(products.length / 10)}
              selectPage={selectPage}
              selectedPage={selectedPage}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default UserProducts;
