import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { UseFormReturn } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
import { ICategory, IProductForm } from '@/interface';
import Button from '@/components/Button';
import { Plus, Trash2 } from 'lucide-react';

interface IAddProduct {
  images: string[];
  categories: ICategory[];
  productForm: UseFormReturn<IProductForm>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleDivClick: (index: number) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addProduct: (data: IProductForm) => void;
  handleRemoveImage: (index: number) => void;
  viewImageModal: boolean;
  selectedImage: string;
  closeImageModal: () => void;
  clearProduct: () => void;
  productEdit: boolean;
  updateImage: boolean;
  isLoading: boolean;
}

const AddProduct = ({
  images,
  categories,
  productForm,
  fileInputRef,
  handleDivClick,
  handleFileChange,
  addProduct,
  handleRemoveImage,
  viewImageModal,
  selectedImage,
  closeImageModal,
  clearProduct,
  productEdit,
  isLoading,
}: IAddProduct) => {
  useEffect(() => {
    console.log('Current Images:', images);
  }, [images]);

  const inputClass = `w-full px-4 py-3 bg-white/10 border border-black/20 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300
  hover:border-purple-500  // Add this line for hover border color
  [&:-webkit-autofill]:bg-black/10
  [&:-webkit-autofill]:text-black
  [&:-webkit-autofill]:shadow-[0_0_0_30px_rgb(0,0,0/0.1)_inset]
  [&:-webkit-autofill]:[text-fill-color:rgb(255,255,255)]`;

  return (
    <div className="flex items-center justify-center py-12 bg-gray-50">
      <div className="w-full max-w-3xl">
        {/* Main Content Container */}
        <motion.div
          className="bg-white/60 p-8 rounded-2xl shadow-lg backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-black mb-1">
              {productEdit ? 'Update Product' : 'Add New Product'}
            </h2>
            <p className="text-black-300 text-sm">
              Fill in the details to {productEdit ? 'update' : 'add'} your product
            </p>
          </div>

          <form className="space-y-4">
            {/* Product Name Input */}
            <div className="relative">
              <label className="block text-black text-sm font-bold mb-1">
                Product Name
              </label>
              <input
                {...productForm.register('productName')}
                type="text"
                className={inputClass}
                placeholder="Product Name"
              />
              {productForm.formState.errors.productName && (
                <p className="text-red-400 text-xs mt-1">
                  {productForm.formState.errors.productName.message}
                </p>
              )}
            </div>

            {/* Description Input */}
            <div className="relative">
              <label className="block text-black text-sm font-bold mb-1">
                Description
              </label>
              <textarea
                {...productForm.register('description')}
                className={inputClass}
                placeholder="Description"
                rows={3}
              />
              {productForm.formState.errors.description && (
                <p className="text-red-400 text-xs mt-1">
                  {productForm.formState.errors.description.message}
                </p>
              )}
            </div>

            {/* Brand Input */}
            <div className="relative">
              <label className="block text-black text-sm font-bold mb-1">
                Brand
              </label>
              <input
                {...productForm.register('brand')}
                type="text"
                className={inputClass}
                placeholder="Brand"
              />
            </div>

            {/* Size and Color Input */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-black text-sm font-bold mb-1">
                  Size
                </label>
                <input
                  {...productForm.register('size')}
                  type="text"
                  className={inputClass}
                  placeholder="Size"
                />
              </div>
              <div className="relative">
                <label className="block text-black text-sm font-bold mb-1">
                  Color
                </label>
                <input
                  {...productForm.register('color')}
                  type="text"
                  className={`${inputClass}`}
                  placeholder="Color"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="relative">
              <label className="block text-black text-sm font-bold mb-1">
                Product Images
              </label>
              <p className="text-black-400 text-xs italic mb-2">
                Upload up to 5 images for your product.
              </p>
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {images?.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-600 cursor-pointer"
                    onClick={() => handleDivClick(index)}
                  >
                    <Image
                      src={img}
                      alt={`Product Image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-110"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage(index);
                      }}
                      className="absolute top-1 right-1 bg-red-600 text-black rounded-full p-1 hover:bg-red-700 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {images.length < 5 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 border-2 border-dashed border-gray-500 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    <Plus size={32} />
                  </button>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>

            {/* Category Selection */}
            <div className="relative">
              <label className="block text-black text-sm font-bold mb-1">
                Category
              </label>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <label
                    key={category.categoryId}
                    className={`flex items-center p-3 border border-gray-600 rounded-xl cursor-pointer transition-colors transform duration-200 ${
                      productForm.watch('categoryId') == category.categoryId
                        ? 'bg-purple-500 text-white' // Highlight color when selected
                        : 'bg-white/30 text-black hover:bg-purple-200' // Default background color with hover effect
                    }`}
                  >
                    <input
                      type="radio"
                      {...productForm.register('categoryId')}
                      value={category.categoryId}
                      className="hidden" // Hide the default radio button
                      id={`category-${category.categoryId}`} // Unique ID for accessibility
                    />
                    <span
                      className={`mr-2 w-5 h-5 flex items-center justify-center border-2 rounded-full transition-colors ${
                        productForm.watch('categoryId') == category.categoryId
                          ? 'border-white bg-white' // Selected state
                          : 'border-gray-400 bg-transparent' // Default state
                      }`}
                    >
                      {productForm.watch('categoryId') == category.categoryId && (
                        <span className="w-3 h-3 rounded-full bg-purple-500" />
                      )}
                    </span>
                    <span className="text-black">{category.categoryName}</span>
                  </label>
                ))}
              </div>
              {productForm.formState.errors.categoryId && (
                <p className="text-red-400 text-xs mt-1">
                  {productForm.formState.errors.categoryId.message}
                </p>
              )}
            </div>
            {/* Condition Selection */}
            <div className="relative">
              <label className="block text-black text-sm font-bold mb-1">
                Condition
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['New', 'Like New', 'Used', 'Heavily Used'].map((condition) => (
                  <label
                    key={condition}
                    className={`flex items-center p-3 border border-gray-600 rounded-xl cursor-pointer transition-colors transform duration-200 ${
                      productForm.watch('condition') === condition
                        ? 'bg-purple-500 text-white' // Highlight color when selected
                        : 'bg-white/30 text-black hover:bg-purple-200' // Default background color with hover effect
                    }`}
                  >
                    <input
                      type="radio"
                      {...productForm.register('condition')}
                      value={condition}
                      className="hidden" // Hide the default radio button
                      id={`condition-${condition}`} // Unique ID for accessibility
                    />
                    <span
                      className={`mr-2 w-5 h-5 flex items-center justify-center border-2 rounded-full transition-colors ${
                        productForm.watch('condition') === condition
                          ? 'border-white bg-white' // Selected state
                          : 'border-gray-400 bg-transparent' // Default state
                      }`}
                    >
                      {productForm.watch('condition') === condition && (
                        <span className="w-3 h-3 rounded-full bg-purple-500" />
                      )}
                    </span>
                    <span className="text-black">{condition}</span>
                  </label>
                ))}
              </div>
              {productForm.formState.errors.condition && (
                <p className="text-red-400 text-xs mt-1">
                  {productForm.formState.errors.condition.message}
                </p>
              )}
            </div>

            {/* Price/Exchange Terms Input */}
            <div className="relative">
              <label className="block text-black text-sm font-bold mb-1">
                Price or Exchange Terms
              </label>
              <input
                type="number"
                {...productForm.register('amount')}
                className={inputClass}
                placeholder="Price"
              />
              {productForm.formState.errors.amount && (
                <p className="text-red-400 text-xs mt-1">
                  {productForm.formState.errors.amount.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
                isLoading={isLoading}
              className="w-full py-3 h-12 flex items-center justify-center"
              borderRadius="roundedXl"
              onClick={productForm.handleSubmit(addProduct)}
            >
              {productEdit ? 'Update Product' : 'Add Product'}
            </Button>
              {!productEdit && (
                <button
                type="button"
                className="bg-gray-300 text-black hover:text-black px-6 py-2 rounded-lg hover:bg-gray-400"
                onClick={clearProduct}
                >
                  Clear
                </button>
              )}
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {viewImageModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-md mx-auto bg-black rounded-lg overflow-hidden"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <button
                type="button"
                onClick={closeImageModal}
                className="absolute top-3 right-3 p-1 bg-black bg-opacity-70 rounded-full text-black"
              >
                <AiOutlineClose size={20} />
              </button>
              <Image
                src={selectedImage}
                alt="Selected"
                className="w-full h-auto"
                height={500}
                width={500}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddProduct;