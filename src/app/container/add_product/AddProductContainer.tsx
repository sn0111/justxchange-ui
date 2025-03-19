import { AddProduct } from '@/app/_components/add_product';
import LoaderComponent from '@/components/LoaderComponent';
import { IProductForm, ICategory, IProduct } from '@/interface';
import { IAxiosError } from '@/interface/IAxiosErrRes';
import { Messages } from '@/lib/messages';
import { notifyError, notifySuccess } from '@/lib/utils';
import { makeRequest } from '@/middleware/axios-helper';
import { API_ENDPOINTS } from '@/services/hooks/apiEndPoints';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const productSchema = yup.object().shape({
  productName: yup.string().required('Product name is required'),
  description: yup.string().required('Description is required'),
  amount: yup
    .string()
    .required('Price is required')
    .matches(/^\d+(\.\d{1,2})?$/, 'Price must be a valid number'),

  categoryId: yup.number().required('Category is required'),
  condition: yup.string().required('Condition is required'),
  brand: yup.string().optional().default('None'),
  size: yup.string().optional().default('None'),
  color: yup.string().optional().default('None'),
  images: yup
    .array()
    .test(
      'at-least-one-image',
      'At least one image is required',
      (value) => Array.isArray(value) && value.some((img) => img !== null)
    )
    .required('At least one image is required'),
});

const AddProductContainer = () => {
  // const [formState, setFormState] = useState({
  //   productName: '',
  //   description: '',
  //   amount: 0.0,
  //   categoryId: 0,
  //   condition: '',
  //   userId: 1,
  // });
  const productForm = useForm<IProductForm>({
    resolver: yupResolver(productSchema),
  });
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [images, setImages] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddProductLoading, setAddProductLoading] = useState(false);
  const [viewImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const searchParams = useSearchParams();
  const [productEdit, setProductEdit] = useState<boolean>(false);
  const [updateImage, setUpdateImage] = useState<boolean>(false);

  useEffect(() => {
    productForm.setValue('images', images as string[], {
      shouldValidate: productForm.formState.isSubmitted,
      shouldTouch: productForm.formState.isSubmitted,
    });
  }, [images, productForm]);

  useEffect(() => {
    const productId = searchParams.get('productId') || '';
    getCategories();
    if (productId) {
      getProductInfo(productId);
      setProductEdit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProductInfo = async (productId: string) => {
    const url = API_ENDPOINTS.product.getProductById(productId);
    const config = {
      method: 'get',
      url: url,
    };
    try {
      setIsLoading(true);
      const responseData: { data: IProduct } = await makeRequest(config);
      if (responseData) {
        const product = responseData.data;
        console.log(product);
        productForm.reset({
          productName: product.productName || '',
          description: product.description || '',
          amount: (product.amount || '0.0').toString(),
          categoryId: Number(product.categoryId),
          condition: product.condition || '',
          brand: product.brand || '',
          size: product.size || '',
          color: product.color || '',
        });
        const updateImages = images;
        updateImages.forEach(
          (_, index) => (updateImages[index] = product.images[index] || '')
        );
        setImages(updateImages);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategories = async () => {
    const url = API_ENDPOINTS.category.getCategories();
    const config = {
      method: 'get',
      url: url,
    };
    try {
      setIsLoading(true);
      const responseData: { data: ICategory[] } = await makeRequest(config);
      if (responseData) {
        setCategories(responseData.data || []);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDivClick = (index: number) => {
    if (images[index] !== null) {
      setSelectedImage(images[index]);
      setShowImageModal(true);
    } else {
      if (fileInputRef.current) {
        fileInputRef.current.click();
        setImageIndex(index);
      }
    }
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage('');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadProductImage(file);
    }
  };

  const uploadProductImage = async (file: File) => {
    const url = API_ENDPOINTS.product.getImage();
    const formData = new FormData();
    formData.append('image', file, file.name);

    const config = {
      method: 'POST',
      url: url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      setIsLoading(true);
      const responseData: { imageUrl: string; message: string } =
        await makeRequest(config);
      if (responseData) {
        const newImages = [...images];
        newImages[imageIndex] = responseData.imageUrl || '';
        setImages(newImages);
        setUpdateImage(true);
        notifySuccess('Image uploaded successfully');
      }
    } catch (err) {
      console.log(err);
      notifyError('Image upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = async (data: IProductForm) => {
    const productId = searchParams.get('productId') ?? '';
    const method = productId ? 'put' : 'post';
    const url = productId
      ? `${API_ENDPOINTS.product.addProduct()}/${productId}`
      : API_ENDPOINTS.product.addProduct();

    const validImages = images.filter((img): img is string => Boolean(img)); // Ensure non-null images
    const body = { ...data, images: validImages };

    console.log(body);

    const config = { method, url, data: body };

    try {
      setAddProductLoading(true);
      const responseData: { data: IProduct; message: string } =
        await makeRequest(config);

      productForm.reset();
      if (!updateImage) {
        setImages([null, null, null, null, null]);
      }
      setUpdateImage(false); // Always reset updateImage

      notifySuccess(responseData.message);
    } catch (err) {
      const error = err as IAxiosError;
      notifyError(
        error.response?.data?.exceptionMessage ?? Messages.somethingWentWrong
      );
    } finally {
      setAddProductLoading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images]; // Create a shallow copy of the array
    updatedImages[index] = null; // Update the specific index
    console.log(updatedImages);
    setImages(updatedImages); // React will detect the change and re-render
    productForm.setValue(
      'images',
      updatedImages.filter((img) => img !== null)
    );
    productForm.trigger('images');
  };

  const clearProduct = () => {
    productForm.reset({
      amount: '',
      brand: '',
      categoryId: 0,
      color: '',
      condition: '',
      description: '',
      productName: '',
      size: '',
    });
    setImages([null, null, null, null, null]);
  };
  return (
    <div>
      {isLoading && <LoaderComponent />}
      <AddProduct
        images={images}
        categories={categories}
        productForm={productForm}
        fileInputRef={fileInputRef}
        handleDivClick={handleDivClick}
        handleFileChange={handleFileChange}
        // handleInputChange={handleInputChange}
        addProduct={addProduct}
        handleRemoveImage={handleRemoveImage}
        viewImageModal={viewImageModal}
        selectedImage={selectedImage}
        closeImageModal={closeImageModal}
        clearProduct={clearProduct}
        productEdit={productEdit}
        isLoading={isAddProductLoading}
        // updateImage={updateImage}
      />
    </div>
  );
};

export default AddProductContainer;
