'use client';

import { OtpVerifierContainer } from '@/app/container/otp_verifier';
import { Suspense } from 'react';

const OtpVerifierPage = () => {
  return (
    <div
      className="flex-grow flex items-center justify-center p-4 bg-gray-100"
      style={{ height: '60vh' }}
    >
      <Suspense><OtpVerifierContainer /></Suspense>
    </div>
  );
};

export default OtpVerifierPage;
