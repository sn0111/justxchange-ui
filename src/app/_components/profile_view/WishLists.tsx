import Pagination from '@/components/Pagination';
import { IProduct } from '@/interface';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface IWishLists {
  products: IProduct[];
  router: AppRouterInstance;
  selectPage: (pageNumber: number) => void;
  selectedPage: number;
}

const Wishlists = ({
  products,
  router,
  selectPage,
  selectedPage,
}: IWishLists) => {
  return (
    <div className="flex-1 p-4 lg:p-6 bg-gray-50">
      <div className=" max-h-[70vh] min-h-[70vh] ">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-4 max-h-[62vh] min-h-[62vh] overflow-y-scroll">
          {products.map((item) => (
            <div key={item.productName} className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl cursor-pointer"
                style={{ backgroundImage: `url("${item.images[0]}")` }}
                onClick={() => router.push(`/view?productId=${item.id}`)}
              ></div>
              <div>
                <p className="text-[#111418] text-base font-medium leading-normal">
                  {item.productName}
                </p>
                <p className="text-[#60758a] text-sm font-normal leading-normal">
                  {item.amount}
                </p>
                <p className="text-[#60758a] text-sm font-normal leading-normal">
                  {item.condition}
                </p>
              </div>
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
    </div>
  );
};

export default Wishlists;
