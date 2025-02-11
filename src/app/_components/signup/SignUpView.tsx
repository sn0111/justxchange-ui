import React, { Dispatch, SetStateAction } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { UseFormReturn } from 'react-hook-form';
import {
  ISignUpFormValues,
  IOTPFormValues,
  IProfileFormValues,
} from '@/interface';
import Button from '@/components/Button';

interface ISignupView {
  step: number;
  mobileNumber: string;
  signUpForm: UseFormReturn<ISignUpFormValues>;
  otpForm: UseFormReturn<IOTPFormValues>;
  profileForm: UseFormReturn<IProfileFormValues>;
  onSubmitSignup: (data: ISignUpFormValues) => void;
  onSubmitOtp: (data: IOTPFormValues) => void;
  onSubmitProfile: (data: IProfileFormValues) => void;
  togglePasswordVisibility: () => void;
  showPassword: boolean;
  setLoginDialogOpen: (event: React.FormEvent) => void;
  isLoading: boolean;
  setView: Dispatch<SetStateAction<'login' | 'signup' | 'forgot'>>;
}

const SignupView = ({
  step,
  mobileNumber,
  signUpForm,
  otpForm,
  profileForm,
  onSubmitSignup,
  onSubmitOtp,
  onSubmitProfile,
  togglePasswordVisibility,
  showPassword,
  isLoading,
  setView,
}: ISignupView) => {
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
            {step === 1 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Sign Up
                  </h2>
                  <p className="bg-gradiant-theme-link text-transparent bg-clip-text">
                    Create a new account
                  </p>
                </div>

                <form className="space-y-6">
                  {/* Email/Mobile Input */}
                  <div className="relative">
                    <input
                      {...signUpForm.register(
                        `${process.env.NEXT_PUBLIC_EMAIL_OR_SMS === 'SMS' ? 'mobileNumber' : 'email'}` as 'email'
                      )}
                      type={
                        process.env.NEXT_PUBLIC_EMAIL_OR_SMS === 'SMS'
                          ? 'tel'
                          : 'email'
                      }
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300
                        "
                      placeholder={
                        process.env.NEXT_PUBLIC_EMAIL_OR_SMS === 'SMS'
                          ? 'Mobile Number'
                          : 'Email'
                      }
                    />

                    {signUpForm.formState.errors.email && (
                      <p className="text-pink-400 text-sm mt-1">
                        {signUpForm.formState.errors.email.message}
                      </p>
                    )}
                    {signUpForm.formState.errors.mobileNumber && (
                      <p className="text-pink-400 text-sm mt-1">
                        {signUpForm.formState.errors.mobileNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Signup Button */}
                  <Button
                    icon={<ArrowRight />}
                    className="w-full py-3 h-12 flex items-center justify-center"
                    borderRadius="roundedXl"
                    onClick={signUpForm.handleSubmit(onSubmitSignup)}
                  >
                    Next
                  </Button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Verify OTP
                  </h2>
                  <p className="bg-gradiant-theme-link text-transparent bg-clip-text">
                    Enter the OTP sent to {mobileNumber}
                  </p>
                </div>

                <form className="space-y-6">
                  {/* OTP Input */}
                  <div className="relative">
                    <input
                      {...otpForm.register('otp')}
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300
                        [&:-webkit-autofill]:bg-black/10 
                        [&:-webkit-autofill]:text-white 
                        [&:-webkit-autofill]:shadow-[0_0_0_30px_rgb(0_0_0/0.1)_inset] 
                        [&:-webkit-autofill]:[text-fill-color:rgb(255,255,255)]"
                      placeholder="OTP"
                    />
                    {otpForm.formState.errors.otp && (
                      <p className="text-pink-400 text-sm mt-1">
                        {otpForm.formState.errors.otp.message}
                      </p>
                    )}
                  </div>

                  {/* Verify OTP Button */}
                  <Button
                    icon={<ArrowRight />}
                    className="w-full py-3 h-12 flex items-center justify-center"
                    borderRadius="roundedXl"
                    onClick={otpForm.handleSubmit(onSubmitOtp)}
                  >
                    Verify
                  </Button>
                </form>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Complete Profile
                  </h2>
                  <p className="bg-gradiant-theme-link text-transparent bg-clip-text">
                    Enter your details to complete the signup
                  </p>
                </div>

                <form className="space-y-6">
                  {/* Name Input */}
                  <div className="relative">
                    <input
                      {...profileForm.register('firstName')}
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300
                        [&:-webkit-autofill]:bg-black/10 
                        [&:-webkit-autofill]:text-white 
                        [&:-webkit-autofill]:shadow-[0_0_0_30px_rgb(0_0_0/0.1)_inset] 
                        [&:-webkit-autofill]:[text-fill-color:rgb(255,255,255)]"
                      placeholder="Name"
                    />
                    {profileForm.formState.errors.firstName && (
                      <p className="text-pink-400 text-sm mt-1">
                        {profileForm.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>

                  {/* Mobile/Email Input */}
                  <div className="relative">
                    <input
                      {...profileForm.register('mobileNumber')}
                      type="tel"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300
                        [&:-webkit-autofill]:bg-black/10 
                        [&:-webkit-autofill]:text-white 
                        [&:-webkit-autofill]:shadow-[0_0_0_30px_rgb(0_0_0/0.1)_inset] 
                        [&:-webkit-autofill]:[text-fill-color:rgb(255,255,255)]"
                      placeholder={
                        process.env.NEXT_PUBLIC_EMAIL_OR_SMS !== 'SMS'
                          ? 'Mobile Number'
                          : 'Email'
                      }
                    />
                    {profileForm.formState.errors.mobileNumber && (
                      <p className="text-pink-400 text-sm mt-1">
                        {profileForm.formState.errors.mobileNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Password Input */}
                  <div className="relative">
                    <input
                      {...profileForm.register('password')}
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
                    {profileForm.formState.errors.password && (
                      <p className="text-pink-400 text-sm mt-1">
                        {profileForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* College Input */}
                  <div className="relative">
                    <input
                      {...profileForm.register('college')}
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300
                        [&:-webkit-autofill]:bg-black/10 
                        [&:-webkit-autofill]:text-white 
                        [&:-webkit-autofill]:shadow-[0_0_0_30px_rgb(0_0_0/0.1)_inset] 
                        [&:-webkit-autofill]:[text-fill-color:rgb(255,255,255)]"
                      placeholder="College"
                    />
                    {profileForm.formState.errors.college && (
                      <p className="text-pink-400 text-sm mt-1">
                        {profileForm.formState.errors.college.message}
                      </p>
                    )}
                  </div>

                  {/* Complete Signup Button */}
                  <Button
                    icon={<ArrowRight />}
                    className="w-full py-3 h-12 flex items-center justify-center"
                    borderRadius="roundedXl"
                    onClick={profileForm.handleSubmit(onSubmitProfile)}
                    isLoading={isLoading}
                  >
                    Complete Signup
                  </Button>
                </form>
              </div>
            )}

            {/* Login Link */}
            <div className="text-center mt-8">
              <span className="text-gray-400">
                {`Already have an account? `}
              </span>
              <button
                onClick={() => setView('login')}
                className="bg-gradiant-theme-link text-transparent bg-clip-text font-medium hover:opacity-80 transition-opacity"
              >
                Login
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupView;
