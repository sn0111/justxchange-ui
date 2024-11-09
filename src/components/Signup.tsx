import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';

interface SignupFormValues {
  mobile?: string;
  otp?: string;
  password: string;
  name?: string;
  email?: string;
  college?: string;
}

const mobileSchema = yup.object().shape({
  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
});

const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .required('OTP is required')
    .length(6, 'OTP must be 6 digits'),
});

const profileSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  college: yup.string().required('College is required'),
});

const Signup = () => {
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(
      step === 1 ? mobileSchema : step === 2 ? otpSchema : profileSchema
    ),
  });

  const onSubmit = (data: SignupFormValues) => {
    if (step === 1) {
      // Simulate sending OTP
      console.log(`Sending OTP to ${data.mobile}`);
      setOtpSent(true); // Set OTP sent state
      setStep(2); // Move to OTP verification step
    } else if (step === 2) {
      // Verify OTP
      if (data.otp === '123456') {
        // Simulated OTP verification (replace with actual OTP logic)
        console.log(`Verifying OTP: ${data.otp}`);
        setStep(3); // Move to profile creation step
      } else {
        alert('Incorrect OTP'); // Handle incorrect OTP case
      }
    } else if (step === 3) {
      // Simulate API call for creating profile
      console.log(`Creating profile: ${data.name}, ${data.email}`);
      login('dummyToken'); // Simulate login
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <input
          {...register('mobile')}
          placeholder="Mobile Number"
          className="w-full p-2 border rounded-lg"
        />
        {errors.mobile && (
          <p className="text-red-500">{errors.mobile.message}</p>
        )}

        {step === 1 && ( // Show "Send OTP" button only at step 1
          <button
            type="submit"
            className="w-full mt-2 p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Send OTP
          </button>
        )}

        {otpSent && ( // Show OTP field only if OTP is sent
          <>
            <input
              {...register('otp')}
              placeholder="Enter OTP"
              className="w-full p-2 mt-2 border rounded-lg"
            />
            {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}

            {step != 3 && (
              <button
                type="submit"
                className="w-full p-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Verify OTP
              </button>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <input
                {...register('password')}
                placeholder="password"
                className="w-full p-2 mt-2 border rounded-lg"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              <input
                {...register('name')}
                placeholder="Full Name"
                className="w-full p-2 mt-2 border rounded-lg"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}

              <input
                {...register('email')}
                placeholder="Email"
                className="w-full p-2 mt-2 border rounded-lg"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              <input
                {...register('college')}
                placeholder="College"
                className="w-full p-2 mt-2 border rounded-lg"
              />
              {errors.college && (
                <p className="text-red-500">{errors.college.message}</p>
              )}    
            </motion.div>
            <button
              type="submit"
              className="w-full p-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Create Profile
            </button>
          </>
        )}
      </form>
      <p className="mt-4 text-gray-600">
        Don't have an account?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </motion.div>
  );
};

export default Signup;
