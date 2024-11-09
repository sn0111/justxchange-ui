'use client';
import Signup from '@/components/Signup';

const SignupPage = () => {
  return (
    <div
      className="flex-grow flex items-center justify-center p-4 bg-gray-100"
      style={{ height: '70vh' }}
    >
      <Signup />
    </div>
  );
};

export default SignupPage;
