'use client';
import React, { Suspense } from 'react';
import { AddProductContainer } from '../container/add_product';
import withAuth from '@/lib/auth/withAuth';

function AddProduct() {
  return (
    <Suspense>
      <AddProductContainer />
    </Suspense>
  );
}

export default withAuth(AddProduct, { allowedRole: 'user' });
