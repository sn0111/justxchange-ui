import React from 'react';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { UseFormReturn } from 'react-hook-form';
import { ICategory, IProductForm } from '@/interface';
import {
  Trash2,
  Upload,
  X,
  Package,
  PencilRuler,
  Palette,
  Tag,
  BadgeDollarSign,
} from 'lucide-react';
import imagePng from '../../../public/images/Placeholder_view_vector.svg';
import Button from '@/components/Button';
interface IAddProduct {
  images: (string | null)[];
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            {productEdit ? 'Update Product' : 'Add New Product'}
          </h2>
          <p className="text-gray-600">
            Fill in the details to {productEdit ? 'update' : 'add'} your product
          </p>
        </div>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            console.log(productForm.formState.errors);
            productForm.handleSubmit(addProduct)(e);
          }}
        >
          {/* Images Section */}
          <div className="space-y-2">
            <label className="text-base font-medium">Product Images *</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {images.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden group"
                >
                  <Image
                    src={img ?? imagePng}
                    alt={`Product ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-200 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="absolute inset-0 flex items-center justify-center gap-2">
                      <button
                        type="button"
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(index);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                        onClick={() => handleDivClick(index)}
                      >
                        <PencilRuler className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              {images.length < 5 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <button
                    type="button"
                    className="w-full h-full aspect-square flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-6 w-6" />
                    <span className="text-xs">Add Image</span>
                  </button>
                </motion.div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {images.every((img) => img === null) &&
              productForm.formState.errors.images && (
                <p className="mt-1 text-sm text-red-600">
                  {productForm.formState.errors.images.message}
                </p>
              )}
          </div>

          {/* Product Details */}
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name *
              </label>
              <div className="relative mt-1">
                <Package className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  {...productForm.register('productName')}
                  className="pl-9 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Enter product name"
                />
              </div>
              {productForm.formState.errors.productName && (
                <p className="mt-1 text-sm text-red-600">
                  {productForm.formState.errors.productName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                {...productForm.register('description')}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 min-h-[100px]"
                placeholder="Enter product description"
              />
              {productForm.formState.errors.description && (
                <p className=" text-sm text-red-600">
                  {productForm.formState.errors.description.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Size
                </label>
                <div className="relative mt-1">
                  <PencilRuler className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    {...productForm.register('size')}
                    className="pl-9 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    placeholder="Size"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Color
                </label>
                <div className="relative mt-1">
                  <Palette className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    {...productForm.register('color')}
                    className="pl-9 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    placeholder="Color"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Brand
              </label>
              <div className="relative mt-1">
                <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  {...productForm.register('brand')}
                  className="pl-9 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Brand name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => {
                  const isChecked =
                    productForm.watch('categoryId') === category.categoryId;

                  return (
                    <label
                      key={category.categoryId}
                      className={`relative flex items-center space-x-2 rounded-lg border p-2 cursor-pointer transition-all
            ${isChecked ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}
          `}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category.categoryId}
                        checked={isChecked}
                        onChange={() =>
                          productForm.setValue(
                            'categoryId',
                            category.categoryId || 0,
                            {
                              shouldValidate: true,
                            }
                          )
                        }
                        className="h-4 w-4 text-purple-500 border-gray-300 focus:ring-transparent focus:outline-none focus:border-transparent"
                      />
                      <span className="font-normal">
                        {category.categoryName}
                      </span>
                    </label>
                  );
                })}
              </div>
              {productForm.formState.errors.categoryId && (
                <p className="mt-1 text-sm text-red-600">
                  {productForm.formState.errors.categoryId.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Condition *
              </label>
              <div className="grid grid-cols-2 gap-4">
                {['New', 'Like New', 'Used', 'Heavily Used'].map(
                  (condition) => {
                    const isChecked =
                      productForm.watch('condition') === condition;

                    return (
                      <label
                        key={condition}
                        className={`relative flex items-center space-x-2 rounded-lg border p-2 cursor-pointer transition-all
            ${isChecked ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}
          `}
                      >
                        <input
                          type="radio"
                          name="condition"
                          value={condition}
                          checked={isChecked}
                          onChange={() =>
                            productForm.setValue('condition', condition, {
                              shouldValidate: true,
                            })
                          }
                          className="h-4 w-4 text-purple-500 border-gray-300 focus:ring-transparent focus:outline-none focus:border-transparent"
                        />
                        <span className="font-normal">{condition}</span>
                      </label>
                    );
                  }
                )}
              </div>
              {productForm.formState.errors.condition && (
                <p className="mt-1 text-sm text-red-600">
                  {productForm.formState.errors.condition.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price *
              </label>
              <div className="relative mt-1">
                <BadgeDollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  {...productForm.register('amount')}
                  className="pl-9 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Enter desired price"
                />
              </div>
              {productForm.formState.errors.amount && (
                <p className="mt-1 text-sm text-red-600">
                  {productForm.formState.errors.amount.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              borderRadius="squared"
              className="w-full flex items-center justify-center"
              isLoading={isLoading}
            >
              {productEdit ? 'Update Product' : 'Add Product'}
            </Button>

            {!productEdit && (
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                onClick={clearProduct}
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>

      <AnimatePresence>
        {viewImageModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-4xl w-full mx-4 bg-white rounded-lg overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <button
                className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full"
                onClick={closeImageModal}
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative aspect-video">
                <Image
                  src={selectedImage}
                  alt="Selected product image"
                  layout="fill"
                  objectFit="contain"
                  className="bg-gray-100"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddProduct;
