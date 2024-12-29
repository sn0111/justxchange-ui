'use client';

import { OtpVerifierContainer } from '@/app/container/otp_verifier';

const OtpVerifierPage = () => {
  return (
    <div
      className="flex-grow flex items-center justify-center p-4 bg-gray-100"
      style={{ height: '60vh' }}
    >
      <OtpVerifierContainer />
    </div>
  );
};

export default OtpVerifierPage;
