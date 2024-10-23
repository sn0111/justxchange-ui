import { SearchProducts } from '@/app/_components/search_product';
import { useRouter } from 'next/navigation';
// import { useState } from 'react';

const SearchProductsContainer = () => {
  const router = useRouter();
//   const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div>
      <SearchProducts router={router} />
    </div>
  );
};

export default SearchProductsContainer;
