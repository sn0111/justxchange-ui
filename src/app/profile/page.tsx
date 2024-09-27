import { FaListAlt, FaUserAlt, FaHeart, FaHistory } from 'react-icons/fa';

export default function ProfilePage() {
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <aside className="w-1/4 bg-white p-6">
            <h2 className="text-xl font-semibold mb-6">My Listings</h2>
            <ul className="space-y-4">
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
          <main className="flex-1 p-6 bg-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">My listings</h2>
              <button className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300">
                Create new listing
              </button>
            </div>

            {/* Listings */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <img
                    className="w-12 h-12 rounded-md object-cover"
                    src="https://via.placeholder.com/50"
                    alt="Dining table and chairs"
                  ></img>
                  <div>
                    <p className="text-lg font-medium">Dining table and chairs</p>
                    <p className="text-sm text-gray-500">Listed 3 weeks ago</p>
                  </div>
                </div>
                <p className="text-lg font-medium">$300</p>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <img
                    className="w-12 h-12 rounded-md object-cover"
                    src="https://via.placeholder.com/50"
                    alt="Macbook Pro 2018"
                    ></img>
                  <div>
                    <p className="text-lg font-medium">Macbook Pro 2018</p>
                    <p className="text-sm text-gray-500">Listed 2 weeks ago</p>
                  </div>
                </div>
                <p className="text-lg font-medium">$800</p>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <img
                    className="w-12 h-12 rounded-md object-cover"
                    src="https://via.placeholder.com/50"
                    alt="Mountain bike"
                    ></img>
                  <div>
                    <p className="text-lg font-medium">Mountain bike</p>
                    <p className="text-sm text-gray-500">Listed 1 week ago</p>
                  </div>
                </div>
                <p className="text-lg font-medium">$250</p>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <img
                    className="w-12 h-12 rounded-md object-cover"
                    src="https://via.placeholder.com/50"
                    alt="Sofa set"
                    ></img>
                  <div>
                    <p className="text-lg font-medium">Sofa set</p>
                    <p className="text-sm text-gray-500">Listed 4 days ago</p>
                  </div>
                </div>
                <p className="text-lg font-medium">$350</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
