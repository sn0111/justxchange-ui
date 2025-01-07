import { ForgotPassword } from '@/app/_components/forgot-password';
import LoaderComponent from '@/components/LoaderComponent';
import {
  IForgotPasswordFormValues,
  IMobileFormValues,
  IOTPFormValues,
} from '@/interface';
import { IAxiosError } from '@/interface/IAxiosErrRes';
import { Messages } from '@/lib/messages';
import { notifyError, notifySuccess } from '@/lib/utils';
import { makeRequest } from '@/middleware/axios-helper';
import { API_ENDPOINTS } from '@/services/hooks/apiEndPoints';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

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

const forgotPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});
const ForgotPasswordContainer = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState(1);
  const router = useRouter();

  const mobileForm = useForm({
    resolver: yupResolver(mobileSchema),
  });

  const otpForm = useForm({
    resolver: yupResolver(otpSchema),
  });

  const forgotPasswordForm = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'onChange',
  });

  const onSubmitMobile = async (data: IMobileFormValues) => {
    console.log(`Sending OTP to ${data.mobileNumber}`);
    setMobileNumber(data.mobileNumber);

    const url = API_ENDPOINTS.auth.sendOtp('+91' + data.mobileNumber);
    const config = {
      method: 'get',
      url: url,
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
        mobileNumber: '+91' + mobileNumber,
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

  const onSubmitPassword = async (data: IForgotPasswordFormValues) => {
    console.log(`Updating password: ${data.password}`);
    const password = data.password;
    const url = API_ENDPOINTS.auth.forgotPassword();
    const config = {
      method: 'put',
      url: url,
      data: {
        password,
        mobileNumber: '+91' + mobileNumber,
      },
    };
    try {
      setIsLoading(true);
      const responseData = await makeRequest(config);
      if (responseData) {
        notifySuccess(responseData.data.message);
        router.push('/login');
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

      <ForgotPassword
        mobileNumber={mobileNumber}
        mobileForm={mobileForm}
        otpForm={otpForm}
        onSubmitMobile={onSubmitMobile}
        onSubmitOtp={onSubmitOtp}
        togglePasswordVisibility={togglePasswordVisibility}
        showPassword={showPassword}
        step={step}
        forgotPasswordForm={forgotPasswordForm}
        onSubmitPassword={onSubmitPassword}
      />
    </div>
  );
};

export default ForgotPasswordContainer;
