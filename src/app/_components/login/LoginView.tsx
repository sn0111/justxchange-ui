import React, { Dispatch, SetStateAction } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { UseFormReturn } from 'react-hook-form';
import { ILoginFormValues } from '@/interface';
import Button from '@/components/Button';

interface ILoginView {
  loginForm: UseFormReturn<ILoginFormValues>;
  loginSubmit: (data: ILoginFormValues) => void;
  togglePasswordVisibility: () => void;
  showPassword: boolean;
  isLoading: boolean;
  setView: Dispatch<SetStateAction<'login' | 'signup' | 'forgot'>>;
}

const LoginView = ({
  loginForm,
  loginSubmit,
  togglePasswordVisibility,
  showPassword,
  isLoading,
  setView,
}: ILoginView) => {
  return (
    <div className="flex items-center justify-center w-96">
      <div className="w-full max-w-md">
        {/* Gradient Border Effect */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradiant-theme-link rounded-2xl blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>

          <motion.div
            className="relative bg-black/80 p-8 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="bg-gradiant-theme-link text-transparent bg-clip-text">
                Sign in to your account
              </p>
            </div>

            <form className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <input
                  {...loginForm.register('mobileNumber')}
                  type="email"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300
                    [&:-webkit-autofill]:bg-black/10 
                    [&:-webkit-autofill]:text-white 
                    [&:-webkit-autofill]:shadow-[0_0_0_30px_rgb(0_0_0/0.1)_inset] 
                    [&:-webkit-autofill]:[text-fill-color:rgb(255,255,255)]"
                  placeholder="Email"
                />
                {loginForm.formState.errors.mobileNumber && (
                  <p className="text-pink-400 text-sm mt-1">
                    {loginForm.formState.errors.mobileNumber.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  {...loginForm.register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 pr-12
                    [&:-webkit-autofill]:bg-black/10 
                    [&:-webkit-autofill]:text-white 
                    [&:-webkit-autofill]:shadow-[0_0_0_30px_rgb(0_0_0/0.1)_inset] 
                    [&:-webkit-autofill]:[text-fill-color:rgb(255,255,255)]"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {loginForm.formState.errors.password && (
                  <p className="text-pink-400 text-sm mt-1">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  onClick={() => setView('forgot')}
                  className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <Button
                icon={<ArrowRight />}
                isLoading={isLoading}
                className="w-full py-3 h-12 flex items-center justify-center"
                borderRadius="roundedXl"
                onClick={loginForm.handleSubmit(loginSubmit)}
              >
                Login
              </Button>

              {/* Sign Up Link */}
              <div className="text-center mt-8">
                <span className="text-gray-400">
                  {`Don't have an account? `}
                </span>
                <button
                  onClick={() => setView('signup')}
                  className="bg-gradiant-theme-link text-transparent bg-clip-text font-medium hover:opacity-80 transition-opacity"
                >
                  Sign up
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
