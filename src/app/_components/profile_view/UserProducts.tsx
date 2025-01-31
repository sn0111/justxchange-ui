import Pagination from '@/components/Pagination';
import { IProduct } from '@/interface';
import { formatProductDate } from '@/lib/utils';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
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
      {/* Listings */}
      <div className=" max-h-[70vh] min-h-[70vh] ">
        <div className="space-y-4 max-h-[62vh] min-h-[62vh] overflow-y-scroll">
          {products.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-between items-start sm:items-center p-2 bg-white rounded-lg space-y-2 sm:space-y-0"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 bg-no-repeat aspect-square bg-cover rounded-xl cursor-pointer"
                  style={{
                    backgroundImage: `url("${item.images[0]}")`,
                  }}
                ></div>
                <div>
                  <p className="text-lg font-medium">
                    {item.productName} ₹{item.amount}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatProductDate(item.createdDate)}
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="pr-3">
                  <FaInfoCircle
                    className="text-xl cursor-pointer"
                    title="View/Edit"
                    onClick={() =>
                      router.push(`/add-product?productId=${item.id}`)
                    }
                  />
                </div>
                <div className="pr-3">
                  <IoIosChatbubbles
                    title="View Chats"
                    className="text-xl cursor-pointer"
                    onClick={() => router.push(`/chat?productId=${item.id}`)}
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
