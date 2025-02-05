import {
  ISignUpFormValues,
  IOTPFormValues,
  IProfileFormValues,
} from '@/interface';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { UseFormReturn } from 'react-hook-form';
import {
  AiOutlineCheck,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';
import { OtpVerifier } from '../otp_verifier/OtpVerifier';

interface ISignUpView {
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
}
const SignUpView = ({
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
}: ISignUpView) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center w-[20rem] p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

      {step === 1 && (
        <form
          onSubmit={signUpForm.handleSubmit(onSubmitSignup)}
          className="w-full"
        >
          {process.env.NEXT_PUBLIC_EMAIL_OR_SMS === 'SMS' ? (
            <input
              {...signUpForm.register('mobileNumber', {
                required: 'Mobile number is required',
              })}
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
          ) : (
            <input
              {...signUpForm.register('email', {
                required: 'Email is required',
                validate: (value) => {
                  if (!value) {
                    return 'Email is required';
                  }
                  const validDomains = ['@rguktn.ac.in', '@rgukts.ac.in'];
                  const emailRegex = new RegExp(
                    `^[a-zA-Z0-9._%+-]+${validDomains.map((d) => d.replace('.', '\\.')).join('|')}$`
                  );
                  return (
                    emailRegex.test(value) ||
                    'Email must end with @rguktn.ac.in or @rgukts.ac.in'
                  );
                },
              })}
              type="email"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter the College email"
              onInput={(e: React.FormEvent<HTMLInputElement>) => {
                const target = e.currentTarget;
                target.value = target.value.replace(/[^a-zA-Z0-9@._+-]/g, ''); // Allow valid email characters
              }}
            />
          )}
          {signUpForm.formState.errors.email && (
            <p className="text-red-500 text-xs w-full">
              {signUpForm.formState.errors.email.message}
            </p>
          )}
          {signUpForm.formState.errors.mobileNumber && (
            <p className="text-red-500 text-xs w-full">
              {signUpForm.formState.errors.mobileNumber.message}
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
          onSubmit={profileForm.handleSubmit(onSubmitProfile)}
          className="w-full"
        >
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="relative w-full">
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
                {...profileForm.register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full p-2 mt-2 border rounded-lg mb-2"
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
            {profileForm.formState.errors.password && (
              <p className="text-red-500">
                {profileForm.formState.errors.password.message}
              </p>
            )}
            <input
              {...profileForm.register('firstName')}
              placeholder="Full Name"
              className="w-full p-2 border rounded-lg mb-2"
            />
            {profileForm.formState.errors.firstName && (
              <p className="text-red-500">
                {profileForm.formState.errors.firstName.message}
              </p>
            )}
            <input
              {...profileForm.register('mobileNumber')}
              placeholder="Mobile Number"
              className="w-full p-2 border rounded-lg mb-2"
            />
            {profileForm.formState.errors.mobileNumber && (
              <p className="text-red-500">
                {profileForm.formState.errors.mobileNumber.message}
              </p>
            )}
            <input
              {...profileForm.register('college')}
              placeholder="College"
              className="w-full p-2 border rounded-lg mb-2"
            />
            {profileForm.formState.errors.college && (
              <p className="text-red-500">
                {profileForm.formState.errors.college.message}
              </p>
            )}
          </motion.div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Create Profile
          </button>
        </form>
      )}

      <p className="mt-4 text-gray-600">
        {`Already have an account? `}
        <Link href="/welcome" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </motion.div>
  );
};

export default SignUpView;
