import { ProductDetails } from '@/app/_components/product_view';
import React from 'react';
import { useEffect, useState } from 'react';

const ProductViewContainer = () => {
  // variables , api calls, function declarations should be in this file

  //example for api call with util function, same should be repeated everywhere for api call
  // const getProductInfo = async (productId: string) => {
  //   const url = API_ENDPOINTS.viewProduct.getProduct(productId);
  //   const config = {
  //     method: 'get',
  //     url: url,
  //   };
  //   try {
  //     setIsLoading(true);
  //     const responseData: { data: someinterface[] } = await makeRequest(config);
  //     if (responseData) {
  //       setData(responseData.data);
  //     }
  //   } catch (err) {
  //     const error = err as IApiErrorResponse;
  //     toast.error(
  //       error.msg || Messages.somethingWentWrong
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const images = [
    'https://cdn.usegalileo.ai/sdxl10/4a713503-117e-408d-9a46-776b9f579d68.png',
    'https://cdn.usegalileo.ai/sdxl10/94775630-cf50-4317-88fb-3726f0bcf951.png',
    'https://cdn.usegalileo.ai/sdxl10/1bf92a27-2460-4465-8f8f-bc5c39c07cf5.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval); // Clear interval on component unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* example format for view layout - <div>product image </div>
      <div>
        product details and profile - component <ProductDetails />
      </div>
      <div>product action footer</div> */}

      <ProductDetails
        images={images}
        currentIndex={currentIndex}
        goToPrevious={goToPrevious}
        goToNext={goToNext}
      />
    </div>
  );
};

export default ProductViewContainer;
