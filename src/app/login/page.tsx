"use client"
import Login from "@/components/Login";

const LoginPage = () => {
  return (
    <div
      className="flex-grow flex items-center justify-center p-4 bg-gray-100"
      style={{ height: '60vh' }}
    >
      <Login />
    </div>
  );
};

export default LoginPage;
