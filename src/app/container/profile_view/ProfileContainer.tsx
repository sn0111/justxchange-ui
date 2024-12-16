import { ProfileDetails } from '@/app/_components/profile_view';
import LoaderComponent from '@/components/LoaderComponent';
import { IProduct } from '@/interface';
import { makeRequest } from '@/middleware/axios-helper';
import { API_ENDPOINTS } from '@/services/hooks/apiEndPoints';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProfileContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState<number>(1);

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

  const selectPage = (pageNumber: number) => {
    setSelectedPage(pageNumber);
  };
  return (
    <div>
      {isLoading && <LoaderComponent />}
      <ProfileDetails
        products={products}
        router={router}
        step={step}
        setStep={setStep}
        selectPage={selectPage}
        selectedPage={selectedPage}
      />
    </div>
  );
};

export default ProfileContainer;
