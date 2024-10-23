'use client';
import withAuth from '@/lib/auth/withAuth';
import { SearchProductsContainer } from '../container/search_product';

function Search() {
  return (
    <SearchProductsContainer/>
  );
}

export default withAuth(Search);