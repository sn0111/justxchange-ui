import SignUpView from '@/app/_components/signup/SignUpView';
import { useAuth } from '@/app/context/AuthContext';
import LoaderComponent from '@/components/LoaderComponent';
import {
  IOTPFormValues,
  IProfileFormValues,
  ISignUpFormValues,
} from '@/interface';
import { IAxiosError } from '@/interface/IAxiosErrRes';
import { Messages } from '@/lib/messages';
import { notifyError } from '@/lib/utils';
import { makeRequest } from '@/middleware/axios-helper';
import { API_ENDPOINTS } from '@/services/hooks/apiEndPoints';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .required('OTP is required')
    .length(6, 'OTP must be 6 digits'),
});

const profileSchema = yup.object().shape({
  firstName: yup.string().required('Name is required'),
  mobileNumber: yup.string().required('Mobile Number is required'),
  password: yup.string().required('Password is required'),
  college: yup.string().required('College is required'),
});

const SignUpContainer = () => {
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Forms
  const signUpForm = useForm({
    defaultValues: { email: '', mobileNumber: '' },
  });

  const otpForm = useForm({
    resolver: yupResolver(otpSchema),
  });

  const profileForm = useForm({
    resolver: yupResolver(profileSchema),
  });

  // Handlers
  const onSubmitSignup = async (data: ISignUpFormValues) => {
    // console.log(`Sending OTP to ${data.mobileNumber}`);
    setMobileNumber(
      process.env.NEXT_PUBLIC_EMAIL_OR_SMS === 'SMS'
        ? data.mobileNumber
        : data.email
    );

    const url = API_ENDPOINTS.auth.sendOtp();
    const config = {
      method: 'post',
      url: url,
      data: {
        signUpValue:
          process.env.NEXT_PUBLIC_EMAIL_OR_SMS === 'SMS'
            ? '+91' + data.mobileNumber
            : data.email,
        emailOrSms: process.env.NEXT_PUBLIC_EMAIL_OR_SMS || 'Email',
      },
    };
    try {
      setIsLoading(true);
      const responseData = await makeRequest(config);
      if (responseData) {
        setStep(2);
      }
    } catch (err) {
      const error = err as IAxiosError;
      notifyError(
        error.response?.data.exceptionMessage ?? Messages.somethingWentWrong
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitOtp = async (data: IOTPFormValues) => {
    console.log(`Verifying OTP: ${data.otp}`);
    // Simulate OTP verification here, if needed

    const url = API_ENDPOINTS.auth.verifyOtp();
    const config = {
      method: 'post',
      url: url,
      data: {
        ...data,
        signUpValue:
          process.env.NEXT_PUBLIC_EMAIL_OR_SMS === 'SMS'
            ? '+91' + mobileNumber
            : mobileNumber,
        emailOrSms: process.env.NEXT_PUBLIC_EMAIL_OR_SMS || 'Email',
      },
    };
    try {
      setIsLoading(true);
      const responseData = await makeRequest(config);
      if (responseData) {
        setStep(3);
      }
    } catch (err) {
      const error = err as IAxiosError;
      notifyError(
        error.response?.data.exceptionMessage ?? Messages.somethingWentWrong
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitProfile = async (data: IProfileFormValues) => {
    console.log(profileForm.formState.errors);
    console.log(`Creating profile for ${data.firstName}, ${data.mobileNumber}`);
    const url = API_ENDPOINTS.auth.saveUser();
    const config = {
      method: 'post',
      url: url,
      data: {
        ...data,
        ...(process.env.NEXT_PUBLIC_EMAIL_OR_SMS === 'SMS'
          ? { mobileNumber: '+91' + mobileNumber }
          : { email: mobileNumber }),
        emailOrSms: process.env.NEXT_PUBLIC_EMAIL_OR_SMS || 'Email',
      },
    };
    try {
      setIsLoading(true);
      const responseData = await makeRequest(config);
      if (responseData) {
        login(responseData.data.token);
        localStorage.setItem('userId', responseData.data.userId);
        router.push('/');
      }
    } catch (err) {
      const error = err as IAxiosError;
      notifyError(
        error.response?.data.exceptionMessage ?? Messages.somethingWentWrong
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      {isLoading && <LoaderComponent />}
      <SignUpView
        step={step}
        mobileNumber={mobileNumber}
        signUpForm={signUpForm}
        otpForm={otpForm}
        profileForm={profileForm}
        onSubmitSignup={onSubmitSignup}
        onSubmitOtp={onSubmitOtp}
        onSubmitProfile={onSubmitProfile}
        togglePasswordVisibility={togglePasswordVisibility}
        showPassword={showPassword}
      />
    </div>
  );
};

export default SignUpContainer;
