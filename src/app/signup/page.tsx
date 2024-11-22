'use client';
import { SignUpContainer } from '../_components/signup';

const SignupPage = () => {
  return (
    <div
      className="flex-grow flex items-center justify-center p-4 bg-gray-100"
      style={{ minHeight: '70vh' }}
    >
      {/* <Signup /> */}
      <SignUpContainer />
    </div>
  );
};

export default SignupPage;
