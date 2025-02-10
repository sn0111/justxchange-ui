import { IProduct, IUserFormValues } from '@/interface';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { List, User, Heart, History, Users, Store } from 'lucide-react'; // Import Lucid icons
import UserProducts from './UserProducts';
import UserProfile from './UserProfile';
import Wishlists from './WishLists';
import UserTransactions from './UserTransactions';
import { UseFormReturn } from 'react-hook-form';
import { Messages } from '@/lib/messages';

interface IProfileView {
  products: IProduct[];
  router: AppRouterInstance;
  step: number;
  setStep: (step: number) => void;
  selectPage: (pageNumber: number) => void;
  selectedPage: number;
  profileForm: UseFormReturn<IUserFormValues>;
  onProfileSubmit: (data: IUserFormValues) => void;
  wishLists: IProduct[];
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  role: string;
  isLoading: boolean;
}

const ProfileDetails = ({
  products,
  router,
  step,
  setStep,
  selectPage,
  selectedPage,
  profileForm,
  onProfileSubmit,
  wishLists,
  fileInputRef,
  handleFileChange,
  role,
  isLoading
}: IProfileView) => {
  return (
    <div className="flex flex-col lg:flex-row  bg-gray-50 w-full ">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 bg-white p-4 lg:p-6">
        <h2 className="text-xl font-semibold mb-4 lg:mb-6">
          {role === Messages.user ? 'Account Details' : 'Admin Panel'}
        </h2>
        <ul className="space-y-2 lg:space-y-4">
          {role === Messages.user ? (
            <>
              <li
                className={`flex items-center gap-3 p-3 rounded-lg ${step === 0 && 'bg-gray-100'} text-black font-medium hover:cursor-pointer hover:bg-gray-100`}
                onClick={() => setStep(0)}
              >
                <List className="w-5 h-5" />
                <span>My Listings</span>
              </li>
              <li
                className={`flex items-center gap-3 p-3 rounded-lg ${step === 1 && 'bg-gray-100'} text-black font-medium hover:cursor-pointer hover:bg-gray-100`}
                onClick={() => setStep(1)}
              >
                <User  className="w-5 h-5" />
                <span>Profile</span>
              </li>
              <li
                className={`flex items-center gap-3 p-3 rounded-lg ${step === 2 && 'bg-gray-100'} text-black font-medium hover:cursor-pointer hover:bg-gray-100`}
                onClick={() => setStep(2)}
              >
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </li>
              <li
                className={`flex items-center gap-3 p-3 rounded-lg ${step === 3 && 'bg-gray-100'} text-black font-medium hover:cursor-pointer hover:bg-gray-100`}
                onClick={() => setStep(3)}
              >
                <History className="w-5 h-5" />
                <span>Transaction History</span>
              </li>
            </>
          ) : (
            <ul className="space-y-2 lg:space-y-4">
              <li
                className={`flex items-center gap-3 p-3 rounded-lg ${step === 1 && 'bg-gray-100'} text-black font-medium hover:cursor-pointer hover:bg-gray-100`}
                onClick={() => setStep(1)}
              >
                <User  className="w-5 h-5" />
                <span>Profile</span>
              </li>
              <li
                className={`flex items-center gap-3 p-3 rounded-lg ${step === 5 && 'bg-gray-100'} text-black font-medium hover:cursor-pointer hover:bg-gray-100`}
                onClick={() => setStep(5)}
              >
                <Users className="w-5 h-5" />
                <span>Users</span>
              </li>
              <li
                className={`flex items-center gap-3 p-3 rounded-lg ${step === 6 && 'bg-gray-100'} text-black font-medium hover:cursor-pointer hover:bg-gray-100`}
                onClick={() => setStep(6)}
              >
                <Store className="w-5 h-5" />
                <span>Products</span>
              </li>
            </ul>
          )}
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
      {step == 1 && (
        <UserProfile
          profileForm={profileForm}
          onProfileSubmit={onProfileSubmit}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          isLoading={isLoading}
        />
      )}
      {step == 2 && (
        <Wishlists
          products={wishLists}
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
      {step == 5 && (
        <div className=" h-[70vh] pl-[33%] flex items-center">Coming Soon!</div>
      )}
      {step == 6 && (
        <div className=" h-[70vh] pl-[33%] flex items-center">Coming Soon!</div>
      )}
    </div>
  );
};

export default ProfileDetails;
