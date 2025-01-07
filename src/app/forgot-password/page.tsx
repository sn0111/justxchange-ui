'use client';
import React from 'react';
import ForgotPasswordContainer from '../container/forgot-password/ForgotPasswordContainer';

const page = () => {
  return (
    <div
      className="flex-grow flex items-center justify-center p-4 bg-gray-100"
      style={{ minHeight: '70vh' }}
    >
      <ForgotPasswordContainer />
    </div>
  );
};

export default page;
