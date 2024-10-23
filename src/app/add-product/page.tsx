'use client';
import React from 'react';
import { AddProductContainer } from '../container/add_product';
import withAuth from '@/lib/auth/withAuth';

function AddProduct() {
  return <AddProductContainer/>
}

export default withAuth(AddProduct);
