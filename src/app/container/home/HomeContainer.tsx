import {
  ImageView,
  ListCategories,
  ListProducts,
} from '@/app/_components/home';
import LoaderComponent from '@/components/LoaderComponent';
import { ICategory, IProduct } from '@/interface';
import { makeRequest } from '@/middleware/axios-helper';
import { API_ENDPOINTS } from '@/services/hooks/apiEndPoints';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const HomeContainer = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectCategory, setSelectCategory] = useState<number>(0);

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

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
        setCategories(responseData.data);
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

  const getProducts = async () => {
    const url = API_ENDPOINTS.product.getProduct();
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
      // const error = err as ;
      // toast.error(
      //   error.msg || Messages.somethingWentWrong
      // );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCategory = async (id: number) => {
    setSelectCategory(id);
    const url = API_ENDPOINTS.product.getProductByCategory(id);
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
      // const error = err as ;
      // toast.error(
      //   error.msg || Messages.somethingWentWrong
      // );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <LoaderComponent />}
      <ImageView />
      <ListCategories
        categories={categories}
        selectCategory={selectCategory}
        handleSelectCategory={handleSelectCategory}
      />
      <ListProducts router={router} products={products} />
    </div>
  );
};

export default HomeContainer;
