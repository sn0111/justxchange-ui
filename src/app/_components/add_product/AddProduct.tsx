import { ICategory } from "@/interface";

interface IAddProduct {
  images: string[];
  categories: ICategory[];
  formState: {
    productName: string;
    description: string;
    amount: string;
    categoryId: number;
    condition: string;
    userId: number
  };
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleDivClick: (index: number) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  addProduct: () => void;
}

const AddProduct = ({
  images,
  categories,
  formState,
  fileInputRef,
  handleDivClick,
  handleFileChange,
  handleInputChange,
  addProduct,
}: IAddProduct) => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden">
      <div className="max-w-3xl md:mx-auto px-6 bg-white rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold mb-6">Add Product</h1>

        <div className="space-y-4 mb-6">
          <input
            type="text"
            name="productName"
            value={formState.productName}
            placeholder="Product name"
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            value={formState.description}
            placeholder="Description"
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Photos</label>
          <p className="text-sm text-gray-500 mb-3">Add up to 5 photos</p>
          <div className="flex space-x-3">
            {images.map((img, index) => (
              <div
                key={index}
                className="w-20 h-20 bg-center bg-cover rounded-lg border border-gray-300 cursor-pointer"
                style={{ backgroundImage: `url(${img})` }}
                onClick={() => handleDivClick(index)}
              ></div>
            ))}
            <input
              type="file"
              accept="image/*" // Allow only image files
              style={{ display: 'none' }} // Hide the input
              ref={fileInputRef} // Reference to trigger click
              onChange={handleFileChange} // Handle file change
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
                  name="categoryId"
                  value={category.categoryId}
                  checked={category.categoryId == formState.categoryId}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                {category.categoryName}
              </label>
            ))}
          </div>
        </div>

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
                    name="condition"
                    value={condition}
                    checked={formState.condition === condition}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  {condition}
                </label>
              )
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">
            Price or Exchange Terms
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              name="amount"
              value={formState.amount}
              placeholder="Price"
              onChange={handleInputChange}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button className="text-gray-600 hover:underline">Cancel</button>
          <button
            onClick={addProduct}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
