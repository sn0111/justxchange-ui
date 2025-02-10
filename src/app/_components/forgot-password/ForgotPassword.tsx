import React from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { UseFormReturn } from 'react-hook-form';
import { ISignUpFormValues, IOTPFormValues, IForgotPasswordFormValues } from '@/interface';
import Button from '@/components/Button';
import { OtpVerifier } from '../otp_verifier/OtpVerifier';
import { AiOutlineCheck } from 'react-icons/ai';

interface IForgotPasswordProps {
  mobileNumber: string;
  signUpForm: UseFormReturn<ISignUpFormValues>;
  otpForm: UseFormReturn<IOTPFormValues>;
  onSubmitMobile: (data: ISignUpFormValues) => void;
  onSubmitOtp: (data: IOTPFormValues) => void;
  togglePasswordVisibility: () => void;
  showPassword: boolean;
  step: number;
  forgotPasswordForm: UseFormReturn<IForgotPasswordFormValues>;
  onSubmitPassword: (data: IForgotPasswordFormValues) => void;
  setLoginDialogOpen: (event: React.FormEvent) => void;
}

const ForgotPassword = ({
  signUpForm,
  onSubmitMobile,
  step,
  mobileNumber,
  otpForm,
  onSubmitOtp,
  togglePasswordVisibility,
  showPassword,
  forgotPasswordForm,
  onSubmitPassword,
  setLoginDialogOpen,
}: IForgotPasswordProps) => {
  return (
    <div className="flex items-center justify-center w-96">
      <div className="w-full max-w-md">
        {/* Gradient Border Effect */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-all duration-300"></div>

          <motion.div
            className="relative bg-black/80 p-8 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Forgot Password
              </h2>
              <p className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
                Reset your password
              </p>
            </div>

            {step === 1 && (
              <form
                className="space-y-6"
              >
                {/* Email/Mobile Input */}
                <div className="relative">
                  <input
                    {...signUpForm.register(
                      process.env.NEXT_PUBLIC_EMAIL_OR_SMS === 'SMS'
                        ? 'mobileNumber'
                        : 'email'
                    )}
                    type={process.env.NEXT_PUBLIC_EMAIL_OR_SMS === 'SMS' ? 'tel' : 'email'}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300
                      [&:-webkit-autofill]:bg-black/10 
                      [&:-webkit-autofill]:text-white 
                      [&:-webkit-autofill]:shadow-[0_0_0_30px_rgb(0_0_0/0.1)_inset] 
                      [&:-webkit-autofill]:[text-fill-color:rgb(255,255,255)]"
                    placeholder={process.env.NEXT_PUBLIC_EMAIL_OR_SMS === 'SMS' ? 'Mobile Number' : 'Email'}
                  />
                  {signUpForm.formState.errors[
                    process.env.NEXT_PUBLIC_EMAIL_OR_SMS === 'SMS' ? 'mobileNumber' : 'email'
                  ] && (
                    <p className="text-pink-400 text-sm mt-1">
                      {signUpForm.formState.errors[
                        process.env.NEXT_PUBLIC_EMAIL_OR_SMS === 'SMS' ? 'mobileNumber' : 'email'
                      ]?.message}
                    </p>
                  )}
                </div>

                {/* Send OTP Button */}
                <Button
                  icon={<ArrowRight />}
                  className="w-full py-3 h-12 flex items-center justify-center"
                  borderRadius="roundedXl"
                  onClick={signUpForm.handleSubmit(onSubmitMobile)}
                >
                  Send OTP
                </Button>
              </form>
            )}

            {step === 2 && (
              <OtpVerifier
                mobileNumber={mobileNumber}
                onOtpSubmit={otpForm.handleSubmit(onSubmitOtp)}
                otpForm={otpForm}
              />
            )}

            {step === 3 && (
              <form
                className="space-y-6"
              >
                {/* Mobile/Email Input */}
                <div className="relative">
                  <input
                    value={mobileNumber}
                    disabled
                    type={process.env.NEXT_PUBLIC_EMAIL_OR_SMS === 'SMS' ? 'tel' : 'email'}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300
                      [&:-webkit-autofill]:bg-black/10 
                      [&:-webkit-autofill]:text-white 
                      [&:-webkit-autofill]:shadow-[0_0_0_30px_rgb(0_0_0/0.1)_inset] 
                      [&:-webkit-autofill]:[text-fill-color:rgb(255,255,255)]"
                    placeholder={process.env.NEXT_PUBLIC_EMAIL_OR_SMS === 'SMS' ? 'Mobile Number' : 'Email'}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <AiOutlineCheck className="w-5 h-5 text-green-500" />
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative">
                  <input
                    {...forgotPasswordForm.register('password')}
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
                  {forgotPasswordForm.formState.errors.password && (
                    <p className="text-pink-400 text-sm mt-1">
                      {forgotPasswordForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div className="relative">
                  <input
                    {...forgotPasswordForm.register('confirmPassword')}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 pr-12
                      [&:-webkit-autofill]:bg-black/10 
                      [&:-webkit-autofill]:text-white 
                      [&:-webkit-autofill]:shadow-[0_0_0_30px_rgb(0_0_0/0.1)_inset] 
                      [&:-webkit-autofill]:[text-fill-color:rgb(255,255,255)]"
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {forgotPasswordForm.formState.errors.confirmPassword && (
                    <p className="text-pink-400 text-sm mt-1">
                      {forgotPasswordForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Reset Password Button */}
                <Button
                  icon={<ArrowRight />}
                  className="w-full py-3 h-12 flex items-center justify-center"
                  borderRadius="roundedXl"
                  onClick={forgotPasswordForm.handleSubmit(onSubmitPassword)}
                >
                  Reset Password
                </Button>
              </form>
            )}

            {/* Login Link */}
            <div className="text-center mt-8">
              <span className="text-gray-400">
                {`Remember your password? `}
              </span>
              <button
                onClick={setLoginDialogOpen}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text font-medium hover:opacity-80 transition-opacity"
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

export default ForgotPassword;