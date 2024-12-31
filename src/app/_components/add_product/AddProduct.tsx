import { ICategory, IProductForm } from '@/interface';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChangeEvent } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';

interface IAddProduct {
  images: string[];
  categories: ICategory[];
  productForm: UseFormReturn<IProductForm>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleDivClick: (index: number) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // handleInputChange: (
  //   event: ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => void;
  addProduct: () => void;
  handleRemoveImage: (index: number) => void;
  viewImageModal: boolean;
  selectedImage: string;
  closeImageModal: () => void;
}

const AddProduct = ({
  images,
  categories,
  productForm,
  fileInputRef,
  handleDivClick,
  handleFileChange,
  // handleInputChange,
  addProduct,
  handleRemoveImage,
  viewImageModal,
  selectedImage,
  closeImageModal,
}: IAddProduct) => {
  return (
    <div className="relative flex size-full py-4 min-h-screen flex-col bg-slate-50 group/design-root">
      <form className="max-w-3xl md:mx-auto p-6 bg-white rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold mb-6">Sell Product</h1>

        <div className="space-y-4 mb-6">
          <div className='p-2'>
            <input
              type="text"
              // name="productName"
              {...productForm.register('productName')}
              // value={formState.productName || ''} // Ensure controlled input
              placeholder="Product name"
              // onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {productForm.formState.errors.productName && (
              <p className="text-red-500 text-xs">
                {productForm.formState.errors.productName.message}
              </p>
            )}
          </div>
          <div className='p-2'>
            <textarea
              // name="description"
              // value={formState.description || ''} // Ensure controlled input
              {...productForm.register('description')}
              placeholder="Description"
              // onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {productForm.formState.errors.description && (
              <p className="text-red-500 text-xs">
                {productForm.formState.errors.description.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Photos</label>
          <p className="text-sm text-gray-500 mb-3">Add up to 5 photos</p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5">
            {images?.map((img, index) => (
              <div
                key={index}
                className="relative w-20 h-20 sm:w-20 sm:h-20 bg-center bg-cover rounded-lg border border-gray-300 cursor-pointer"
                style={{ backgroundImage: `url(${img})` }}
                onClick={() => handleDivClick(index)}
              >
                <AiOutlineClose
                  className="absolute -top-1 -right-1 text-white bg-black rounded-full p-1 cursor-pointer"
                  size={16}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering onClick of the parent div
                    handleRemoveImage(index);
                  }}
                />
              </div>
            ))}
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Category</label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category, index) => (
              <label
                key={index}
                className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer"
              >
                <input
                  type="radio"
                  // name="categoryId"
                  value={category.categoryId}
                  {...productForm.register('categoryId')}
                  checked={category.categoryId == productForm.watch('categoryId')}
                  // onChange={handleInputChange}
                  className="mr-2"
                />
                {category.categoryName}
              </label>
            ))}
            {productForm.formState.errors.categoryId && (
              <p className="text-red-500 text-xs">
                {productForm.formState.errors.categoryId.message}
              </p>
            )}
          </div>
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
                className="relative max-w-md mx-auto bg-white rounded-lg overflow-hidden"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={closeImageModal}
                  className="absolute top-3 right-3 p-1 bg-black bg-opacity-70 rounded-full text-white"
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

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Condition</label>
          <div className="grid grid-cols-2 gap-3">
            {['New', 'Like New', 'Used', 'Heavily Used'].map(
              (condition, index) => (
                <label
                  key={index}
                  className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer"
                >
                  <input
                    type="radio"
                    // name="condition"
                    value={condition}
                    {...productForm.register('condition')}
                    checked={productForm.watch('condition') === condition}
                    // onChange={handleInputChange}
                    className="mr-2"
                  />
                  {condition}
                </label>
              )
            )}
            {productForm.formState.errors.condition && (
              <p className="text-red-500 text-xs">
                {productForm.formState.errors.condition.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-6 col-span-1">
          <label className="block text-lg font-medium mb-2">
            Price or Exchange Terms
          </label>
          <div className="flex space-x-4">
            <input
              type="number"
              // name="amount"
              // value={formState.amount || 0} // Ensure controlled input
              {...productForm.register('amount')}
              // onChange={handleInputChange}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {productForm.formState.errors.amount && (
            <p className="text-red-500 text-xs">
              {productForm.formState.errors.amount.message}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button className="text-gray-600 hover:underline" onClick={()=>productForm.reset()}>Clear</button>
          <button
            onClick={addProduct}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
