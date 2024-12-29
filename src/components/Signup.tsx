import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import {
  AiOutlineCheck,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import {
  IMobileFormValues,
  IOTPFormValues,
  IProfileFormValues,
} from '@/interface';

// Validation schemas
const mobileSchema = yup.object().shape({
  mobileNumber: yup
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
  firstName: yup.string().required('First name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  college: yup.string().required('College is required'),
});

const Signup = () => {
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(profileForm.formState.errors);
  });

  // Forms
  const mobileForm = useForm({
    resolver: yupResolver(mobileSchema),
  });

  const otpForm = useForm({
    resolver: yupResolver(otpSchema),
  });

  const profileForm = useForm({
    resolver: yupResolver(profileSchema),
  });

  // Handlers
  const onSubmitMobile = (data: IMobileFormValues) => {
    console.log(`Sending OTP to ${data.mobileNumber}`);
    setMobileNumber(data.mobileNumber);
    setStep(2);
  };

  const onSubmitOtp = (data: IOTPFormValues) => {
    console.log(`Verifying OTP: ${data.otp}`);
    // Simulate OTP verification here, if needed
    setStep(3); // Move to profile creation step
  };

  const onSubmitProfile = (data: IProfileFormValues) => {
    console.log('wrok.');
    console.log(`Creating profile for ${data.firstName}, ${data.email}`);
    login('dummyToken');
    router.push('/');
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
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

      {step === 1 && (
        <form
          onSubmit={mobileForm.handleSubmit(onSubmitMobile)}
          className="w-full"
        >
          <input
            {...mobileForm.register('mobileNumber')}
            placeholder="Mobile Number"
            className="w-full p-2 border rounded-lg"
          />
          {mobileForm.formState.errors.mobileNumber && (
            <p className="text-red-500">
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
        <form onSubmit={otpForm.handleSubmit(onSubmitOtp)} className="w-full">
          <input
            value={mobileNumber}
            disabled
            placeholder="Mobile Number"
            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none 
           focus:ring-2 focus:ring-green-500 border-gray-300 
           disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <input
            {...otpForm.register('otp')}
            placeholder="Enter OTP"
            className="w-full p-2 mt-2 border rounded-lg"
          />
          {otpForm.formState.errors.otp && (
            <p className="text-red-500">
              {otpForm.formState.errors.otp.message}
            </p>
          )}
          <button
            type="submit"
            className="w-full mt-2 p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Verify OTP
          </button>
        </form>
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
                placeholder="Mobile Number"
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
              placeholder="First Name"
              className="w-full p-2 border rounded-lg mb-2"
            />
            {profileForm.formState.errors.firstName && (
              <p className="text-red-500">
                {profileForm.formState.errors.firstName.message}
              </p>
            )}
            <input
              {...profileForm.register('email')}
              placeholder="Email"
              className="w-full p-2 border rounded-lg mb-2"
            />
            {profileForm.formState.errors.email && (
              <p className="text-red-500">
                {profileForm.formState.errors.email.message}
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
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </motion.div>
  );
};

export default Signup;

// import { motion } from 'framer-motion';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useState } from 'react';
// import { useAuth } from '@/app/context/AuthContext';
// import Link from 'next/link';

// interface MobileFormValues {
//   mobile: string;
// }

// interface OTPFormValues {
//   otp: string;
// }

// interface ProfileFormValues {
//   name: string;
//   email: string;
//   college: string;
// }

// const mobileSchema = yup.object().shape({
//   mobile: yup
//     .string()
//     .required('Mobile number is required')
//     .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
// });

// const otpSchema = yup.object().shape({
//   otp: yup
//     .string()
//     .required('OTP is required')
//     .length(6, 'OTP must be 6 digits'),
// });

// const profileSchema = yup.object().shape({
//   name: yup.string().required('Name is required'),
//   email: yup.string().email('Invalid email').required('Email is required'),
//   college: yup.string().required('College is required'),
// });

// const Signup = () => {
//   const { login } = useAuth();
//   const [step, setStep] = useState(1);
//   const [otpSent, setOtpSent] = useState(false);

//   const {
//     register: registerMobile,
//     handleSubmit: handleSubmitMobile,
//     formState: { errors: errorsMobile },
//   } = useForm<MobileFormValues>({
//     resolver: yupResolver(mobileSchema),
//   });

//   const {
//     register: registerOtp,
//     handleSubmit: handleSubmitOtp,
//     formState: { errors: errorsOtp },
//   } = useForm<OTPFormValues>({
//     resolver: yupResolver(otpSchema),
//   });

//   const {
//     register: registerProfile,
//     handleSubmit: handleSubmitProfile,
//     formState: { errors: errorsProfile },
//   } = useForm<ProfileFormValues>({
//     resolver: yupResolver(profileSchema),
//   });

//   const onSubmitMobile = (data: MobileFormValues) => {
//     console.log(`Sending OTP to ${data.mobile}`);
//     setOtpSent(true);
//     setStep(2);
//   };

//   const onSubmitOtp = (data: OTPFormValues) => {
//     if (data.otp === '123456') {
//       console.log(`Verifying OTP: ${data.otp}`);
//       setStep(3);
//     } else {
//       alert('Incorrect OTP');
//     }
//   };

//   const onSubmitProfile = (data: ProfileFormValues) => {
//     console.log(`Creating profile: ${data.name}, ${data.email}`);
//     login('dummyToken');
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 100 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5 }}
//       className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white rounded-lg shadow-md"
//     >
//       <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

//       {step === 1 && (
//         <form onSubmit={handleSubmitMobile(onSubmitMobile)} className="w-full">
//           <input
//             {...registerMobile('mobile')}
//             placeholder="Mobile Number"
//             className="w-full p-2 border rounded-lg"
//           />
//           {errorsMobile.mobile && (
//             <p className="text-red-500">{errorsMobile.mobile.message}</p>
//           )}
//           <button
//             type="submit"
//             className="w-full mt-2 p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
//           >
//             Send OTP
//           </button>
//         </form>
//       )}

//       {step === 2 && otpSent && (
//         <form onSubmit={handleSubmitOtp(onSubmitOtp)} className="w-full">
//           <input
//             {...registerOtp('otp')}
//             placeholder="Enter OTP"
//             className="w-full p-2 mt-2 border rounded-lg"
//           />
//           {errorsOtp.otp && (
//             <p className="text-red-500">{errorsOtp.otp.message}</p>
//           )}
//           <button
//             type="submit"
//             className="w-full p-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
//           >
//             Verify OTP
//           </button>
//         </form>
//       )}

//       {step === 3 && (
//         <form
//           onSubmit={handleSubmitProfile(onSubmitProfile)}
//           className="w-full"
//         >
//           <input
//             {...registerProfile('name')}
//             placeholder="Full Name"
//             className="w-full p-2 mt-2 border rounded-lg"
//           />
//           {errorsProfile.name && (
//             <p className="text-red-500">{errorsProfile.name.message}</p>
//           )}
//           <input
//             {...registerProfile('email')}
//             placeholder="Email"
//             className="w-full p-2 mt-2 border rounded-lg"
//           />
//           {errorsProfile.email && (
//             <p className="text-red-500">{errorsProfile.email.message}</p>
//           )}
//           <input
//             {...registerProfile('college')}
//             placeholder="College"
//             className="w-full p-2 mt-2 border rounded-lg"
//           />
//           {errorsProfile.college && (
//             <p className="text-red-500">{errorsProfile.college.message}</p>
//           )}
//           <button
//             type="submit"
//             className="w-full p-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
//           >
//             Create Profile
//           </button>
//         </form>
//       )}

//       <p className="mt-4 text-gray-600">
//         Already have an account?{' '}
//         <Link href="/login" className="text-blue-600 hover:underline">
//           Login
//         </Link>
//       </p>
//     </motion.div>
//   );
// };

// export default Signup;

// import { motion } from 'framer-motion';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useState } from 'react';
// import { useAuth } from '@/app/context/AuthContext';
// import Link from 'next/link';

// interface MobileFormValues {
//   mobileNumber: string;
// }

// interface OTPFormValues {
//   mobileNumber: string;
//   otp: string;
// }

// interface ProfileFormValues {
//   mobileNumber: string;
//   password: string;
//   name: string;
//   email: string;
//   college: string;
// }

// // type SignupFormValues = MobileFormValues | OtpFormValues | ProfileFormValues;

// interface SignupFormValues {
//   mobileNumber?: string;
//   otp?: string;
//   password: string;
//   name?: string;
//   email?: string;
//   college?: string;
// }

// const mobileSchema = yup.object().shape({
//   mobileNumber: yup
//     .string()
//     .required('Mobile number is required')
//     .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
// });

// const otpSchema = yup.object().shape({
//   mobileNumber: yup
//     .string()
//     .required('Mobile number is required')
//     .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
//   otp: yup
//     .string()
//     .required('OTP is required')
//     .length(6, 'OTP must be 6 digits'),
// });

// const profileSchema = yup.object().shape({
//   mobileNumber: yup
//     .string()
//     .required('Mobile number is required')
//     .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
//   name: yup.string().required('Name is required'),
//   email: yup.string().email('Invalid email').required('Email is required'),
//   password: yup.string().required('Password is required'),
//   college: yup.string().required('College is required'),
// });

// const Signup = () => {
//   const { login } = useAuth();
//   const [step, setStep] = useState(1);
//   const [otpSent, setOtpSent] = useState(false);

//   const {
//     register: registerMobile,
//     handleSubmit: handleSubmitMobile,
//     formState: { errors: errorsMobile },
//   } = useForm<MobileFormValues>({
//     resolver: yupResolver(mobileSchema),
//   });

//   const {
//     register: registerOtp,
//     handleSubmit: handleSubmitOtp,
//     formState: { errors: errorsOtp },
//   } = useForm<OTPFormValues>({
//     resolver: yupResolver(otpSchema),
//   });

//   const {
//     register: registerProfile,
//     handleSubmit: handleSubmitProfile,
//     formState: { errors: errorsProfile },
//   } = useForm<ProfileFormValues>({
//     resolver: yupResolver(profileSchema),
//   });

//   const onSubmitMobile = (data: MobileFormValues) => {
//     console.log(`Sending OTP to ${data.mobileNumber}`);
//     setOtpSent(true);
//     setStep(2);
//   };

//   const onSubmitOtp = (data: OTPFormValues) => {
//     if (data.otp === '123456') {
//       console.log(`Verifying OTP: ${data.otp}`);
//       setStep(3);
//     } else {
//       alert('Incorrect OTP');
//     }
//   };

//   const onSubmitProfile = (data: ProfileFormValues) => {
//     console.log(`Creating profile: ${data.name}, ${data.email}`);
//     login('dummyToken');
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 100 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.5 }}
//       className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white rounded-lg shadow-md"
//     >
//       <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
//       {step === 1 && (
//         <form onSubmit={handleSubmitMobile(onSubmitMobile)} className="w-full">
//           <input
//             {...registerMobile('mobileNumber')}
//             placeholder="Mobile Number"
//             className="w-full p-2 border rounded-lg"
//           />
//           {errorsMobile.mobileNumber && (
//             <p className="text-red-500">{errorsMobile.mobileNumber.message}</p>
//           )}

//           <button
//             type="submit"
//             className="w-full mt-2 p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
//           >
//             Send OTP
//           </button>
//         </form>
//       )}
//       {step === 2 && (
//         <form onSubmit={handleSubmitOtp(onSubmitOtp)} className="w-full">
//           <input
//             {...registerOtp('mobileNumber')}
//             placeholder="Mobile Number"
//             // className="w-full p-2 border rounded-lg"
//             className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none
//            focus:ring-2 focus:ring-green-500 border-gray-300
//            disabled:bg-gray-100 disabled:cursor-not-allowed"
//             disabled
//           />
//           <input
//             {...registerOtp('otp')}
//             placeholder="Enter OTP"
//             className="w-full p-2 mt-2 border rounded-lg"
//           />
//           {errorsOtp.otp && (
//             <p className="text-red-500">{errorsOtp.otp.message}</p>
//           )}
//           <button
//             type="submit"
//             className="w-full p-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
//           >
//             Verify OTP
//           </button>
//         </form>
//       )}
//       {step === 3 && (
//         <form
//           onSubmit={handleSubmitProfile(onSubmitProfile)}
//           className="w-full"
//         >
//           <motion.div
//             initial={{ x: '100%', opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: '100%', opacity: 0 }}
//             transition={{ duration: 0.5 }}
//             className="w-full"
//           >
//             <input
//               {...registerProfile('mobileNumber')}
//               placeholder="Mobile Number"
//               className="w-full p-2 border rounded-lg"
//               disabled
//             />
//             <input
//               {...registerProfile('password')}
//               placeholder="password"
//               className="w-full p-2 mt-2 border rounded-lg"
//             />
//             {errorsProfile.password && (
//               <p className="text-red-500">{errorsProfile.password.message}</p>
//             )}

//             <input
//               {...registerProfile('name')}
//               placeholder="Full Name"
//               className="w-full p-2 mt-2 border rounded-lg"
//             />
//             {errorsProfile.name && (
//               <p className="text-red-500">{errorsProfile.name.message}</p>
//             )}

//             <input
//               {...registerProfile('email')}
//               placeholder="Email"
//               className="w-full p-2 mt-2 border rounded-lg"
//             />
//             {errorsProfile.email && (
//               <p className="text-red-500">{errorsProfile.email.message}</p>
//             )}

//             <input
//               {...registerProfile('college')}
//               placeholder="College"
//               className="w-full p-2 mt-2 border rounded-lg"
//             />
//             {errorsProfile.college && (
//               <p className="text-red-500">{errorsProfile.college.message}</p>
//             )}
//           </motion.div>
//           <button
//             type="submit"
//             className="w-full p-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
//           >
//             Create Profile
//           </button>
//         </form>
//       )}
//       <p className="mt-4 text-gray-600">
//         Don't have an account?{' '}
//         <Link href="/login" className="text-blue-600 hover:underline">
//           Login
//         </Link>
//       </p>
//     </motion.div>
//   );
// };

// export default Signup;
