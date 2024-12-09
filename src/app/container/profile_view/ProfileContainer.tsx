import { ProfileDetails } from '@/app/_components/profile_view';
import LoaderComponent from '@/components/LoaderComponent';
import { IProduct } from '@/interface';
import { makeRequest } from '@/middleware/axios-helper';
import { API_ENDPOINTS } from '@/services/hooks/apiEndPoints';
import { useEffect, useState } from 'react';

const ProfileContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    console.log(localStorage.getItem('productId'));
    getUserProducts();
  }, []);

  const getUserProducts = async () => {
    const url = API_ENDPOINTS.product.getUserProducts();
    console.log(url);
    const config = {
      method: 'get',
      url: url,
    };
    try {
      setIsLoading(true);
      const responseData: { data: IProduct[] } = await makeRequest(config);
      if (responseData) {
        setProducts(responseData.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {isLoading && <LoaderComponent />}
      <ProfileDetails products={products} />
    </div>
  );
};

export default ProfileContainer;
