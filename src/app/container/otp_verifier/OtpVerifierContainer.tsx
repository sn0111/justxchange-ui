import { OtpVerifier } from '@/app/_components/signup';
import { useAuth } from '@/app/context/AuthContext';
import LoaderComponent from '@/components/LoaderComponent';
import { IOTPFormValues } from '@/interface';
import { IAxiosError } from '@/interface/IAxiosErrRes';
import { Messages } from '@/lib/messages';
import { notifyError } from '@/lib/utils';
import { makeRequest } from '@/middleware/axios-helper';
import { API_ENDPOINTS } from '@/services/hooks/apiEndPoints';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .required('OTP is required')
    .length(6, 'OTP must be 6 digits'),
});

const OtpVerifierContainer = () => {
  const otpForm = useForm({
    resolver: yupResolver(otpSchema),
  });
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchParams = useSearchParams(); // Hook to access query params
  const mobileNumber = searchParams.get('mobileNumber');
  const router = useRouter();

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
        login(responseData.data.verifyOtp.token);
        localStorage.setItem('userId', responseData.data.verifyOtp.userId);
        router.push('/home');
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
  return (
    <div>
      {isLoading && <LoaderComponent />}
      <OtpVerifier
        mobileNumber={mobileNumber as string}
        otpForm={otpForm}
        onOtpSubmit={otpForm.handleSubmit(onSubmitOtp)}
      />
    </div>
  );
};

export default OtpVerifierContainer;
