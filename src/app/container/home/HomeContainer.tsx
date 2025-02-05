import {
  ImageView,
  ListCategories,
  ListProducts,
} from '@/app/_components/home';
import LoaderComponent from '@/components/LoaderComponent';
import { ICategory, IProduct, IProductFilters } from '@/interface';
import { makeRequest } from '@/middleware/axios-helper';
import { API_ENDPOINTS } from '@/services/hooks/apiEndPoints';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const HomeContainer = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [selectCategory, setSelectCategory] = useState<string>('');

  useEffect(() => {
    getCategories();
    getProductsByCategory('', '', '', false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    } finally {
      setIsLoading(false);
    }
  };

  const getProductsByCategory = (
    categoryUuid: string,
    searchQuery: string,
    condition: string,
    filter: boolean
  ) => {
    const body: IProductFilters = {
      productUuid: '',
      categoryUuid: categoryUuid,
      condition: condition,
      isFilter: filter,
      page: 1,
      searchQuery: searchQuery,
      size: 10,
    };
    getProducts(body);
  };

  const getProducts = async (body: IProductFilters) => {
    const url = API_ENDPOINTS.product.filterProducts();

    const config = {
      method: 'post',
      url: url,
      data: body,
    };
    try {
      setIsLoading(true);
      const responseData = await makeRequest(config);
      if (responseData) {
        setProducts(responseData.data.data);
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

  const handleSelectCategory = async (uuid: string) => {
    // setSelectCategory(uuid);
    getProductsByCategory(uuid, '', '', true);
    // const url = API_ENDPOINTS.product.getProductByCategory(id);
    // const config = {
    //   method: 'get',
    //   url: url,
    // };
    // try {
    //   setIsLoading(true);
    //   const responseData: { data: IProduct[] } = await makeRequest(config);
    //   if (responseData) {
    //     setProducts(responseData.data);
    //   }
    // } catch (err) {
    //   console.log(err);
    //   // const error = err as ;
    //   // toast.error(
    //   //   error.msg || Messages.somethingWentWrong
    //   // );
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div>
      {isLoading && <LoaderComponent />}
      <ImageView />
      <ListCategories
        categories={categories}
        handleSelectCategory={handleSelectCategory}
      />
      <ListProducts router={router} products={products} />
    </div>
  );
};

export default HomeContainer;
