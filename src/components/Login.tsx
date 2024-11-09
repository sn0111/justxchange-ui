import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

interface LoginFormValues {
  mobileNumber: string;
  password: string;
}

const loginSchema = yup.object().shape({
  mobileNumber: yup.string().required('Mobile Number is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    // Simulate API call
    setTimeout(() => {
      login('dummyToken');
      router.push('/');
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <input
          {...register('mobileNumber')}
          placeholder="Mobile number"
          className="w-full p-2 mb-2 border rounded-lg"
        />
        {errors.mobileNumber && (
          <p className="text-red-500">{errors.mobileNumber.message}</p>
        )}

        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            placeholder="Password"
            className="w-full p-2 mb-2 border rounded-lg"
          />
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible className="w-5 h-5 text-gray-500" />
            ) : (
              <AiOutlineEye className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-gray-600">
        Don't have an account?{' '}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </motion.div>
  );
};

export default Login;
