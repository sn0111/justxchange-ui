import { SearchProducts } from '@/app/_components/search_product';
import { useRouter } from 'next/navigation';

const SearchProductsContainer = () => {
  const router = useRouter();

  return (
    <div>
      <SearchProducts router={router}/>
    </div>
  );
};

export default SearchProductsContainer;
