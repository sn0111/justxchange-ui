'use client';
import React from 'react';

export default function AddProduct() {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden">
      <div className="max-w-3xl md:mx-auto px-6 bg-white rounded-lg shadow-sm">
        {/* Title */}
        <h1 className="text-2xl font-semibold mb-6">Add Product</h1>

        {/* Product Name and Description */}
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Product name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Photo Upload Section */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Photos</label>
          <p className="text-sm text-gray-500 mb-3">Add up to 5 photos</p>
          <div className="flex space-x-3">
            {/* Sample thumbnails, replace with actual uploaded images */}
            {[
              '/path/to/image1.jpg',
              '/path/to/image2.jpg',
              '/path/to/image3.jpg',
              '/path/to/image4.jpg',
            ].map((img, index) => (
              <div
                key={index}
                className="w-20 h-20 bg-center bg-cover rounded-lg border border-gray-300"
                style={{ backgroundImage: `url(${img})` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Category Section */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Category</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Clothing',
              'Watches',
              'Jewelry',
              'Accessories',
              'Books',
              'Sports',
              'Electronics',
              'Games',
              'Shoes',
              'Other',
            ].map((category, index) => (
              <label
                key={index}
                className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer"
              >
                <input type="radio" name="category" className="mr-2" />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Condition Section */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Condition</label>
          <div className="grid grid-cols-2 gap-3">
            {['New', 'Like New', 'Used', 'Heavily Used'].map(
              (condition, index) => (
                <label
                  key={index}
                  className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer"
                >
                  <input type="radio" name="condition" className="mr-2" />
                  {condition}
                </label>
              )
            )}
          </div>
        </div>

        {/* Price and Exchange Terms */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">
            Price or Exchange Terms
          </label>
          <div className="flex space-x-4 w-0.5">
            <input
              type="text"
              placeholder="Price"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* <input
            type="text"
            placeholder="Exchange for"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-between items-center">
          <button className="text-gray-600 hover:underline">Cancel</button>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
