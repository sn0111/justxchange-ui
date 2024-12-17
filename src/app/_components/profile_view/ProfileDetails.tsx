import { IProduct } from '@/interface';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';
import {
  FaHeart,
  FaHistory,
  FaInfoCircle,
  FaListAlt,
  FaUserAlt,
} from 'react-icons/fa';
import { IoIosChatbubbles } from 'react-icons/io';
import UserProducts from './UserProducts';
import UserProfile from './UserProfile';
import Wishlists from './WishLists';
import UserTransactions from './UserTransactions';

interface IProfileView {
  products: IProduct[];
  router: AppRouterInstance;
  step: number;
  setStep: (step: number) => void;
  selectPage: (pageNumber: number) => void;
  selectedPage: number;
}

const ProfileDetails = ({
  products,
  router,
  step,
  setStep,
  selectPage,
  selectedPage,
}: IProfileView) => {
  return (
    <div className="flex flex-col lg:flex-row  bg-gray-50 ">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 bg-white p-4 lg:p-6">
        <h2 className="text-xl font-semibold mb-4 lg:mb-6">My Listings</h2>
        <ul className="space-y-2 lg:space-y-4">
          <li
            className={`flex items-center gap-3 p-3 rounded-lg ${step === 0 && 'bg-gray-100'} text-black font-medium hover:cursor-pointer hover:bg-gray-100`}
            onClick={() => setStep(0)}
          >
            <FaListAlt className="w-5 h-5" />
            <span>My Listings</span>
          </li>
          <li
            className={`hover:cursor-pointer flex items-center gap-3 p-3 rounded-lg ${step === 1 && 'bg-gray-100'} text-black font-medium hover:bg-gray-100`}
            onClick={() => setStep(1)}
          >
            <FaUserAlt className="w-5 h-5" />
            <span>Profile</span>
          </li>
          <li
            className={`flex items-center gap-3 p-3 rounded-lg ${step === 2 && 'bg-gray-100'} text-black font-medium hover:cursor-pointer hover:bg-gray-100`}
            onClick={() => setStep(2)}
          >
            <FaHeart className="w-5 h-5" />
            <span>Wishlist</span>
          </li>
          <li
            className={`flex items-center gap-3 p-3 rounded-lg ${step === 3 && 'bg-gray-100'} text-black font-medium hover:cursor-pointer hover:bg-gray-100`}
            onClick={() => setStep(3)}
          >
            <FaHistory className="w-5 h-5" />
            <span>Transaction History</span>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      {step == 0 && (
        <UserProducts
          products={products}
          router={router}
          selectPage={selectPage}
          selectedPage={selectedPage}
        />
      )}
      {step == 1 && <UserProfile />}
      {step == 2 && (
        <Wishlists
          products={products}
          router={router}
          selectPage={selectPage}
          selectedPage={selectedPage}
        />
      )}
      {step == 3 && (
        <UserTransactions
          products={products}
          router={router}
          selectPage={selectPage}
          selectedPage={selectedPage}
        />
      )}
    </div>
  );
};

export default ProfileDetails;
