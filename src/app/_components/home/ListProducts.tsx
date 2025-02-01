import DefaultNotFound from '@/components/DefaultNotFound';
import { IProduct } from '@/interface';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface IListProducts {
  router: AppRouterInstance;
  products: IProduct[];
}
const ListProducts = ({ router, products }: IListProducts) => {
  return (
    <>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-4">
      {products.map((item) => (
        <div key={item.id} className="flex flex-col gap-3 pb-3">
          <div
            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl cursor-pointer"
            style={{
              backgroundImage: `url("${item.images && item.images.length > 0 ? item?.images[0] : ''}")`,
            }}
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
    {products.length < 1 && <DefaultNotFound text='No Products found' containerHeight='min-h-[60vh]'/>}
    </>
  );
};

export default ListProducts;
