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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-4 lg:p-6">
        {[
          {
            name: 'Intro to Computer Science',
            price: '$50',
            rating: '4.3/5',
            img: 'https://cdn.usegalileo.ai/stability/6d1e9cb7-c3ba-4408-a046-b8beb221216a.png',
          },
          {
            name: 'The Great Gatsby',
            price: '$10',
            rating: '4.5/5',
            img: 'https://cdn.usegalileo.ai/stability/e668574b-8197-47bf-8e2e-432981896e6a.png',
          },
          {
            name: 'Hamlet',
            price: '$8',
            rating: '4.2/5',
            img: 'https://cdn.usegalileo.ai/sdxl10/796fe706-860d-4630-9e58-921dcfb2dde5.png',
          },
          {
            name: 'Organic Chemistry',
            price: '$70',
            rating: '4.6/5',
            img: 'https://cdn.usegalileo.ai/sdxl10/63d44c89-ade7-482f-903f-eefe662e58e2.png',
          },
          {
            name: 'The Elements of Style',
            price: '$6',
            rating: '4.3/5',
            img: 'https://cdn.usegalileo.ai/sdxl10/280d8187-53ab-46c9-b4a1-367ed2149a93.png',
          },
          {
            name: 'The Odyssey',
            price: '$12',
            rating: '4.5/5',
            img: 'https://cdn.usegalileo.ai/sdxl10/befc5121-1000-4637-ba2e-246f853f23e4.png',
          },
          {
            name: 'A Tale of Two Cities',
            price: '$7',
            rating: '4.1/5',
            img: 'https://cdn.usegalileo.ai/sdxl10/54438da4-ed97-4444-961e-d1e1d9f2753b.png',
          },
          {
            name: 'The Catcher in the Rye',
            price: '$15',
            rating: '4.4/5',
            img: 'https://cdn.usegalileo.ai/stability/dae7aec8-a52f-453f-b1cb-85eccb346c7d.png',
          },
        ].map((item) => (
          <div key={item.name} className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl cursor-pointer"
              style={{ backgroundImage: `url("${item.img}")` }}
              onClick={() => router.push('/view')}
            ></div>
            <div>
              <p className="text-[#111418] text-base font-medium leading-normal">
                {item.name}
              </p>
              <p className="text-[#60758a] text-sm font-normal leading-normal">
                {item.price}
              </p>
              <p className="text-[#60758a] text-sm font-normal leading-normal">
                {item.rating}
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
  );
};

export default Wishlists;
