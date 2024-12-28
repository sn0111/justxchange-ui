import { SearchProducts } from '@/app/_components/search_product';
import LoaderComponent from '@/components/LoaderComponent';
import { ICategory, IProduct, IProductFilters, ISuggesions } from '@/interface';
import { makeRequest } from '@/middleware/axios-helper';
import { API_ENDPOINTS } from '@/services/hooks/apiEndPoints';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// import { useState } from 'react';

const SearchProductsContainer = () => {
  const router = useRouter();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectCategory, setSelectCategory] = useState<string>('');
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [productsCount, setProductsCount] = useState<number>(0);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ISuggesions[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

 useEffect(() => {
    getCategories();
    getProductsByCategory('', '', '', false)
    
  }, []);

  const getProductsByCategory=(categoryUuid: string, searchQuery: string, condition: string, filter: boolean)=>{
    const body: IProductFilters={
      productUuid: '',
      categoryUuid: categoryUuid,
      condition: condition,
      isFilter: filter,
      page: 1,
      searchQuery: searchQuery,
      size: 10
    }
    getProducts(body);
  }

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      const url = API_ENDPOINTS.product.productSuggestions();
      const config = {
        method: 'get',
        url: url,
        params: { query }
      };
      try {
        setIsLoading(true);
        const responseData: { data: ISuggesions[] } = await makeRequest(config);
        if (responseData?.data) {
          setSuggestions(responseData.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
        setLoading(false);
      }

    };

    // Debounce API calls
    const debounceTimeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' && activeIndex !== null && activeIndex < suggestions.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (e.key === 'ArrowUp' && activeIndex !== null && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (e.key === 'Enter' && activeIndex !== null) {
      // You can handle the suggestion click here, e.g., by setting the input to the selected suggestion
      setQuery(suggestions[activeIndex].productName);
      setSuggestions([]); // Clear suggestions after selection
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
        setCategories(responseData.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };


  const getProducts = async (body: IProductFilters) => {
    if(body.categoryUuid)
      setSelectCategory(body.categoryUuid)

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
        setSuggestions([])
        setProductsCount(responseData.data.meta.totalCount)
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
      <SearchProducts router={router} categories={categories} products={products} selectCategory={selectCategory} getProductsByCategory={getProductsByCategory} selectPage={setSelectedPage} selectedPage={selectedPage} query={query} setQuery={setQuery} handleKeyDown={handleKeyDown} loading={loading} activeIndex={0} setActiveIndex={setActiveIndex} suggestions={suggestions} setSuggestions={setSuggestions} productsCount={productsCount}/>
    </div>
  );
};

export default SearchProductsContainer;
