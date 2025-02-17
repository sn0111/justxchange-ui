import { IProduct } from '@/interface';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import DefaultNotFound from '@/components/DefaultNotFound';
import { ArrowRight } from 'lucide-react';
import BadgeComponent from '@/components/Badge';

interface IListProducts {
  router: AppRouterInstance;
  products: IProduct[];
}

const ListProducts = ({ router, products }: IListProducts) => {
  return (
    <div className="min-h-[80vh]  m-4 p-4 sm:p-6 bg-gray-100 shadow-sm rounded-xl">
      {/* Main Content Container */}
      {/* Products Grid - Updated grid columns for better responsiveness */}
      <div
        className="grid place-items-center gap-y-8 gap-x-4
  grid-cols-2 
  sm:grid-cols-2 
  md:grid-cols-3 
  lg:grid-cols-3 
  xl:grid-cols-4 
  2xl:grid-cols-5"
      >
        {products.map((item, index) => (
          <div
            key={item.productId}
            className="group relative md:w-[16rem]"
            style={{
              animation: `fadeSlideIn 0.5s ease-out ${index * 0.1}s both`,
            }}
          >
            {/* Gradient border effect on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur"></div>

            {/* Product Card - Lightened background */}
            <div className="relative overflow-hidden  rounded-xl backdrop-blur-xl transform transition-all duration-300 group-hover:translate-y-[-4px]">
              <div className="relative overflow-hidden  rounded-t-xl">
                <div
                  className="w-full overflow-hidden aspect-square bg-center bg-no-repeat bg-cover transform transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: `url("${item.images?.[0] || '/api/placeholder/400/400'}")`,
                  }}
                />
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product Details - Added padding for content */}
              <div className="p-4 space-y-3 bg-gradient-to-br from-[#1a0d35]/95 via-[#231447]/95 to-[#150d29]/95 rounded-b-xl">
                <h3 className="text-white font-medium text-sm sm:text-base truncate md:w-full  w-32 group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-indigo-500 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">
                  {item.productName}
                </h3>

                <div className="flex items-center justify-between">
                  {/* Enhanced price display */}
                  <span className="text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent text-sm sm:text-base">
                    ₹{item.amount}
                  </span>
                  {/* Enhanced condition badge */}

                  {
                    <BadgeComponent
                      key={item.productId}
                      condition={item.condition ?? ''}
                    />
                  }
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => router.push(`/view?productId=${item.id}`)}
                  className="w-full text-sm sm:text-base mt-2 px-4 py-2 bg-white/10 hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 rounded-lg text-white transition-all duration-300 flex items-center justify-center group/btn"
                >
                  View Details
                  <ArrowRight className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State - Updated background for consistency */}
      {products.length < 1 && (
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
              <div className="w-20 h-20 bg-[#1a0d35] rounded-full flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#1a0d35]">
              No Products Found
            </h3>
            {/* <p className="text-gray-400">
              Try adjusting your search or filters
            </p> */}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ListProducts;
