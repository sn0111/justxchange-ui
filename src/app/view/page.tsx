'use client';

import withAuth from '@/lib/auth/withAuth';
import { ProductViewContainer } from '../container/product_view';
import { Suspense } from 'react';

function View() {
  return <Suspense><ProductViewContainer /></Suspense>
}

export default withAuth(View);