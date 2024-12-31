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
  amount: yup.number().required("Amount is required"),
  categoryId: yup.number().required('Category is required'),
  condition: yup.string().required('Condition is required')
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
  const [images, setImages] = useState<string[]>(['', '', '', '', '']);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [viewImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const productId = searchParams.get('productId') || '';
    getCategories();
    if(productId)
      getProductInfo(productId);
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
        console.log(product)
        productForm.reset({
          productName: product.productName || '',
          description: product.description || '',
          amount: product.amount || 0.0,
          categoryId: Number(product.categoryId) || 0,
          condition: product.condition || ''
        })
        setImages(product.images || ['', '', '', '', '']);
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
    if (images[index] !== '') {
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

  // const handleInputChange = (
  //   event: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => {
  //   const { name, value } = event.target;

  //   // If the event target is a select element, handle its value correctly
  //   setFormState((prevState) => ({
  //     ...prevState,
  //     [name]: value || '',
  //   }));
  // };

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
        notifySuccess('Image uploaded successfully');
      }
    } catch (err) {
      console.log(err);
      notifyError('Image upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = async () => {
    let url = API_ENDPOINTS.product.addProduct();
    const productId = searchParams.get('productId') || '';
    let method = 'post'
    if(productId){
      method = 'put'
      url = url+"/"+productId
    }
    const body = { ...productForm.getValues(), images: images.filter((img) => img !== '') };
    console.log(body)
    const config = {
      method: method,
      url: url,
      data: body,
    };
    try {
      setIsLoading(true);
      const responseData: { data: IProduct; message: string } =
        await makeRequest(config);
      if (responseData) {
        productForm.reset();
        setImages(['', '', '', '', '']);
        notifySuccess(responseData.message);
      }
    } catch (err) {
      const error = err as IAxiosError;
      notifyError(
        error.response?.data.exceptionMessage ?? Messages.somethingWentWrong
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
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
      />
    </div>
  );
};

export default AddProductContainer;
