import Pagination from '@/components/Pagination';
import { IProduct } from '@/interface';
import { formatProductDate } from '@/lib/utils';
import { Info, MessageCircle } from 'lucide-react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import React from 'react';

interface IUserTransactions {
  products: IProduct[];
  router: AppRouterInstance;
  selectPage: (pageNumber: number) => void;
  selectedPage: number;
}

const UserTransactions = ({
  products,
  router,
  selectPage,
  selectedPage,
}: IUserTransactions) => {
  return (
    <main className="flex-1 p-4 lg:p-6 bg-gray-50">
      {/* Listings */}
      <div className=" max-h-[90vh] min-h-[90vh] ">
        <div className="space-y-4 max-h-[80vh] min-h-[80vh] overflow-y-scroll">
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
              <div className="flex relative">
                <div className="pr-3 group relative">
                  <Info
                    className="text-xl cursor-pointer text-[#0d141c] hover:text-[#2589f4] transition duration-200"
                    onClick={() =>
                      router.push(`/add-product?productId=${item.id}`)
                    }
                  />
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    View/Edit
                  </div>
                </div>
                <div className="pr-3 group relative">
                  <MessageCircle
                    className="text-xl cursor-pointer text-[#0d141c] hover:text-[#2589f4] transition duration-200"
                    onClick={() => router.push(`/chat?productId=${item.id}`)}
                  />
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    View Chats
                  </div>
                </div>
              </div>
              {/* <p className="text-lg font-medium">{item.amount}</p> */}
            </div>
          ))}
        </div>
        <div className="pt-3">
          {Math.ceil(products.length / 10) > 0 && (
            <Pagination
              totalRecords={products.length}
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

export default UserTransactions;
