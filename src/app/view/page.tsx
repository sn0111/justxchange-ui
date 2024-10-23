'use client';

import withAuth from '@/lib/auth/withAuth';
import { ProductViewContainer } from '../container/product_view';

function View() {
  return <ProductViewContainer />;
}

export default withAuth(View);