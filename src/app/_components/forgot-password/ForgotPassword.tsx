import {
  IForgotPasswordFormValues,
  IMobileFormValues,
  IOTPFormValues,
} from '@/interface';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { OtpVerifier } from '../otp_verifier/OtpVerifier';
import {
  AiOutlineCheck,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';

interface IForgotPasswordProps {
  mobileNumber: string;
  mobileForm: UseFormReturn<IMobileFormValues>;
  otpForm: UseFormReturn<IOTPFormValues>;
  onSubmitMobile: (data: IMobileFormValues) => void;
  onSubmitOtp: (data: IOTPFormValues) => void;
  togglePasswordVisibility: () => void;
  showPassword: boolean;
  step: number;
  forgotPasswordForm: UseFormReturn<IForgotPasswordFormValues>;
  onSubmitPassword: (data: IForgotPasswordFormValues) => void;
}
const ForgotPassword = ({
  mobileForm,
  onSubmitMobile,
  step,
  mobileNumber,
  otpForm,
  onSubmitOtp,
  togglePasswordVisibility,
  showPassword,
  forgotPasswordForm,
  onSubmitPassword,
}: IForgotPasswordProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center w-[20rem] p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6">Forgot Password</h1>
      {step === 1 && (
        <form
          onSubmit={mobileForm.handleSubmit(onSubmitMobile)}
          className="w-full"
        >
          <input
            {...mobileForm.register('mobileNumber')}
            className="w-full p-2 border rounded-lg"
            placeholder="Mobile number (10 digits)"
            maxLength={10}
            type="tel"
            inputMode="numeric"
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const target = e.currentTarget;
              target.value = target.value.replace(/[^0-9]/g, '');
            }}
          />
          {mobileForm.formState.errors.mobileNumber && (
            <p className="text-red-500 text-xs w-full">
              {mobileForm.formState.errors.mobileNumber.message}
            </p>
          )}
          <button
            type="submit"
            className="w-full mt-2 p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Send OTP
          </button>
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
          onSubmit={forgotPasswordForm.handleSubmit(onSubmitPassword)}
          className="w-full"
        >
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="relative w-full mb-1">
              <input
                value={mobileNumber}
                disabled
                placeholder="Mobile number (10 digits)"
                maxLength={10}
                type="tel"
                inputMode="numeric"
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                  const target = e.currentTarget;
                  target.value = target.value.replace(/[^0-9]/g, '');
                }}
                className="w-full p-2 border rounded-lg shadow-sm focus:outline-none 
                 focus:ring-2 focus:ring-green-500 border-gray-300 
                 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <AiOutlineCheck className="w-5 h-5 text-green-500" />
              </div>
            </div>

            <div className="relative w-full">
              <input
                {...forgotPasswordForm.register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full p-2  border rounded-lg mt-2"
              />
              <div
                className="absolute inset-y-0 top-[8px] right-0 flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5 text-gray-500" />
                ) : (
                  <AiOutlineEye className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>
            {forgotPasswordForm.formState.errors.password &&
              forgotPasswordForm.formState.errors.password.message !==
                forgotPasswordForm.formState.errors.confirmPassword
                  ?.message && (
                <p className="text-red-500 text-xs">
                  {forgotPasswordForm.formState.errors.password.message}
                </p>
              )}
            <div className="relative w-full">
              <input
                {...forgotPasswordForm.register('confirmPassword')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                className="w-full p-2  border rounded-lg mt-2"
              />
              <div
                className="absolute inset-y-0 top-[8px] right-0 flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5 text-gray-500" />
                ) : (
                  <AiOutlineEye className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>
            {forgotPasswordForm.formState.errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {forgotPasswordForm.formState.errors.confirmPassword.message}
              </p>
            )}
            {/* {forgotPasswordForm.formState && (
              <p className="text-red-500 text-xs">{'Passwords do not match'}</p>
            )} */}
          </motion.div>
          <button
            type="submit"
            className="w-full p-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Reset Password
          </button>
        </form>
      )}

      <p className="mt-4 text-gray-600">
        {`Remember your password? `}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </motion.div>
  );
};

export default ForgotPassword;
