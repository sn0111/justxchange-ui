import { ILoginFormValues } from '@/interface';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { UseFormReturn } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface ILoginView {
  loginForm: UseFormReturn<ILoginFormValues>;
  loginSubmit: (data: ILoginFormValues) => void;
  togglePasswordVisibility: () => void;
  showPassword: boolean;
}

const LoginView = ({
  loginForm,
  loginSubmit,
  togglePasswordVisibility,
  showPassword,
}: ILoginView) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white rounded-lg shadow-md"
    >
      {/* {isLoading && <LoaderComponent />} */}
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={loginForm.handleSubmit(loginSubmit)} className="w-full">
        <div className="mb-2">
          <input
            {...loginForm.register('mobileNumber')}
            placeholder="Mobile number (10 digits)"
            className="w-full p-2 border rounded-lg"
            maxLength={10}
            type="tel"
            inputMode="numeric"
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const target = e.currentTarget;
              target.value = target.value.replace(/[^0-9]/g, '');
            }}
          />
          {loginForm.formState.errors.mobileNumber && (
            <p className="text-red-500 text-xs">
              {loginForm.formState.errors.mobileNumber.message}
            </p>
          )}
        </div>
        <div className="relative w-full ">
          <input
            type={showPassword ? 'text' : 'password'}
            {...loginForm.register('password')}
            placeholder="Password"
            className="w-full p-2 border rounded-lg"
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
        {loginForm.formState.errors.password && (
          <p className="text-red-500 text-xs">
            {loginForm.formState.errors.password.message}
          </p>
        )}

        <button
          type="submit"
          className="w-full p-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-gray-600">
        {`Don't have an account? `}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </motion.div>
  );
};

export default LoginView;
