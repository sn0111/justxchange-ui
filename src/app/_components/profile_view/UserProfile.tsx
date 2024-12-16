import FloatingLabelInput from '@/components/FloatingLabelInput';
import React from 'react';

const UserProfile = () => {
  return (
    <main className="flex-1 p-4 lg:p-6 flex justify-center items-center">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <div className="flex items-center justify-center mb-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s" // Replace with actual image path
            alt="Profile Picture"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-600 text-sm mb-2"
              htmlFor="firstName"
            >
              User Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          {/* <div className="col-span-1 md:col-span-2">
              <label
                className="block text-gray-600 text-sm mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="jondoe@example.com"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
              />
            </div> */}
          <div className="">
            <label
              className="block text-gray-600 text-sm mb-2"
              htmlFor="contactNumber"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              placeholder="+91-8223635900"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label
              className="block text-gray-600 text-sm mb-2"
              htmlFor="address"
            >
              Collage
            </label>
            <input
              type="text"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label
              className="block text-gray-600 text-sm mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <textarea className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500" />
          </div>
        </form>
        <div className="flex items-center justify-center pt-4">
          <button className="ml-4 text-purple-500 hover:text-purple-700 border border-purple-500 hover:border-purple-700 px-4 py-2 rounded-lg">
            Edit Profile
          </button>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
