'use client';

import { LoginContainer } from '../container/login';

const LoginPage = () => {
  return (
    <div
      className="flex-grow flex items-center justify-center p-4 bg-gray-100"
      style={{ height: '60vh' }}
    >
      {/* <Login /> */}
      <LoginContainer />
    </div>
  );
};

export default LoginPage;
