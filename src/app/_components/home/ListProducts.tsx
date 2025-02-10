import { motion } from 'framer-motion';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { IProduct } from '@/interface';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import DefaultNotFound from '@/components/DefaultNotFound';

interface IListProducts {
  router: AppRouterInstance;
  products: IProduct[];
}

const ListProducts = ({ router, products }: IListProducts) => {
  return (
      <div className="w-full max-w">
        {/* Gradient Border Effect */}

          <motion.div
            className="relative p-8 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {products.map((item) => (
                <motion.div
                  key={item.id}
                  className="flex flex-col gap-3 pb-3 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push(`/view?productId=${item.id}`)}
                >
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl cursor-pointer group-hover:scale-105 transition-transform"
                    style={{
                      backgroundImage: `url("${
                        item.images && item.images.length > 0 ? item?.images[0] : ''
                      }")`,
                    }}
                  ></div>
                  <div>
                    <p className="text-white text-base font-medium leading-normal group-hover:text-pink-500 transition-colors">
                      {item.productName}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400 text-sm font-normal leading-normal">
                        {item.amount}
                      </p>
                      <p className="text-gray-400 text-sm font-normal leading-normal">
                        {item.condition}
                      </p>
                    </div>
                    <button className="flex items-center gap-2 text-pink-500 font-medium hover:text-pink-400 transition-colors">
                      View Details
                      <AiOutlineArrowRight />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            {products.length < 1 && (
              <DefaultNotFound
                text="No Products found"
                containerHeight="min-h-[60vh]"
              />
            )}
          </motion.div>
      </div>
  );
};

export default ListProducts;