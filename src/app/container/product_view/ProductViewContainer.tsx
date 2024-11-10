import { ProductDetails } from '@/app/_components/product_view';
import LoaderComponent from '@/components/LoaderComponent';
import { IProduct } from '@/interface';
import { makeRequest } from '@/middleware/axios-helper';
import { API_ENDPOINTS } from '@/services/hooks/apiEndPoints';
import React from 'react';
import { useEffect, useState } from 'react';

const ProductViewContainer = () => {
  // variables , api calls, function declarations should be in this file
  const [product, setProduct] = useState<IProduct>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(localStorage.getItem('productId'));
    getProductInfo(localStorage.getItem('productId') || '');
  }, []);

  //example for api call with util function, same should be repeated everywhere for api call
  const getProductInfo = async (productId: string) => {
    const url = API_ENDPOINTS.product.getProductById(productId);
    console.log(url);
    const config = {
      method: 'get',
      url: url,
    };
    try {
      setIsLoading(true);
      const responseData: { data: IProduct } = await makeRequest(config);
      if (responseData) {
        setProduct(responseData.data);
      }
    } catch (err) {
      console.log(err);
      // const error = err as ;
      // toast.error(
      //   error.msg || Messages.somethingWentWrong
      // );
    } finally {
      setIsLoading(false);
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      if (product && Array.isArray(product.images)) {
        const imagesLength = product.images.length;
        return prevIndex === 0 ? imagesLength - 1 : prevIndex - 1;
      }
      return 0;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      if (product && Array.isArray(product.images)) {
        const imagesLength = product.images.length;
        return prevIndex === 0 ? imagesLength - 1 : prevIndex + 1;
      }
      return 0;
    });
  };

  // Auto change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval); // Clear interval on component unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isLoading && <LoaderComponent />}
      {product && (
        <ProductDetails
          product={product}
          currentIndex={currentIndex}
          goToPrevious={goToPrevious}
          goToNext={goToNext}
        />
      )}
    </div>
  );
};

export default ProductViewContainer;
