import { IProduct } from '@/interface';
import { FaHeart, FaHistory, FaListAlt, FaUserAlt } from 'react-icons/fa';

interface IProfileView {
  products: IProduct[];
}

const ProfileDetails = ({ products }: IProfileView) => {
  return (
    <div className="flex flex-col lg:flex-row  bg-gray-100 ">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 bg-white p-4 lg:p-6">
        <h2 className="text-xl font-semibold mb-4 lg:mb-6">My Listings</h2>
        <ul className="space-y-2 lg:space-y-4">
          <li className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 text-black font-medium">
            <FaListAlt className="w-5 h-5" />
            <span>My Listings</span>
          </li>
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-600">
            <FaUserAlt className="w-5 h-5" />
            <span>Profile</span>
          </li>
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-600">
            <FaHeart className="w-5 h-5" />
            <span>Wishlist</span>
          </li>
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-600">
            <FaHistory className="w-5 h-5" />
            <span>Transaction History</span>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 lg:p-6 bg-white">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 lg:mb-8">
          <h2 className="text-2xl font-semibold mb-2 lg:mb-0">My Listings</h2>
          <button className="bg-gray-200 text-black px-3 py-2 rounded-lg hover:bg-gray-300">
            Create new listing
          </button>
        </div>

        {/* Listings */}
        <div className="space-y-4 min-h-96">
          {products.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-lg space-y-2 sm:space-y-0"
            >
              <div className="flex items-center gap-4">
                <img
                  className="w-12 h-12 rounded-md object-cover"
                  src={item.images[0]}
                  alt={item.productName}
                  width={48}
                  height={48}
                />
                <div>
                  <p className="text-lg font-medium">{item.productName}</p>
                  <p className="text-sm text-gray-500">
                    Listed {item.createdDate}
                  </p>
                </div>
              </div>
              <p className="text-lg font-medium">{item.amount}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProfileDetails;
