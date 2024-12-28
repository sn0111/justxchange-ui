import { SearchProducts } from '@/app/_components/search_product';
import LoaderComponent from '@/components/LoaderComponent';
import { ICategory, IProduct } from '@/interface';
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
  const [selectCategory, setSelectCategory] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

 useEffect(() => {
    getCategories();
    getProducts(0);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {

        const s = [
          "Laptop",
          "Laptop Bag","Lap Desk"
        ]
        setSuggestions(s);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
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
      setQuery(suggestions[activeIndex]);
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
      // const error = err as ;
      // toast.error(
      //   error.msg || Messages.somethingWentWrong
      // );
    } finally {
      setIsLoading(false);
    }
  };


  const getProducts = async (id: number) => {
    setSelectCategory(id)
    let url = API_ENDPOINTS.product.getProduct();
    if(id){
      url = API_ENDPOINTS.product.getProductByCategory(id);
    }
    
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
      <SearchProducts router={router} categories={categories} products={products} selectCategory={selectCategory} getProducts={getProducts} selectPage={setSelectedPage} selectedPage={selectedPage} query={query} setQuery={setQuery} handleKeyDown={handleKeyDown} loading={loading} activeIndex={0} setActiveIndex={setActiveIndex} suggestions={[]} setSuggestions={()=>{}}/>
    </div>
  );
};

export default SearchProductsContainer;
