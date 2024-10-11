import { AddProduct } from '@/app/_components/add_product';
import { ICategory, IProduct } from '@/interface';
import { makeRequest } from '@/middleware/axios-helper';
import { API_ENDPOINTS } from '@/services/hooks/apiEndPoints';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const AddProductContainer = () => {
  const [formState, setFormState] = useState({
    productName: '',
    description: '',
    amount: '',
    categoryId: 0,
    condition: '',
    userId: 1,
  });
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [product, setProduct] = useState<IProduct>();
  const [images, setImages] = useState<String[]>(['', '', '', '', '']);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const url = API_ENDPOINTS.category.getCategories();
    const config = {
      method: 'get',
      url: url,
    };
    try {
      // setIsLoading(true);
      const responseData: { data: ICategory[] } = await makeRequest(config);
      if (responseData) {
        setCategories(responseData.data);
      }
    } catch (err) {
      console.log(err);
      // const error = err as ;
      // toast.error(
      //   error.msg || Messages.somethingWentWrong
      // );
    } finally {
      // setIsLoading(false);
    }
  };

  const handleDivClick = (index: number) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
      setImageIndex(index);
    }
  };

  // Function to handle the file upload (onChange event)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File uploaded:', file);
      uploadProductImage(file);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
    console.log(formState);
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
      // setIsLoading(true);
      const responseData: { data: { imageUrl: string } } =
        await makeRequest(config);
      if (responseData) {
        const newImages = [...images];
        newImages[imageIndex] = responseData.data.imageUrl;
        setImages(newImages);
      }
    } catch (err) {
      console.log(err);
      // const error = err as ;
      // toast.error(
      //   error.msg || Messages.somethingWentWrong
      // );
    } finally {
      // setIsLoading(false);
    }
  };

  const addProduct = async () => {
    const url = API_ENDPOINTS.product.addProduct();
    const body = { ...formState, images: images.filter(img => img!='') };
    console.log(body);
    const config = {
      method: 'post',
      url: url,
      data: body,
    };
    try {
      // setIsLoading(true);
      const responseData: { data: IProduct } = await makeRequest(config);
      if (responseData) {
        setProduct(responseData.data);
        setFormState({
          productName: '',
          description: '',
          amount: '',
          categoryId: 0,
          condition: '',
          userId: 1,
        });
        setImages(['', '', '', '', '']);
      }
    } catch (err) {
      console.log(err);
      // const error = err as ;
      // toast.error(
      //   error.msg || Messages.somethingWentWrong
      // );
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div>
      <AddProduct
        images={images}
        categories={categories}
        formState={formState}
        fileInputRef={fileInputRef}
        handleDivClick={handleDivClick}
        handleFileChange={handleFileChange}
        handleInputChange={handleInputChange}
        addProduct={addProduct}
      />
    </div>
  );
};

export default AddProductContainer;
