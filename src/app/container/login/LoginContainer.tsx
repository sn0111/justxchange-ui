import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/app/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/services/hooks/apiEndPoints';
import { notifyError } from '@/lib/utils';
import { makeRequest } from '@/middleware/axios-helper';
import { ILoginFormValues } from '@/interface';
import { LoginView } from '@/app/_components/login';
import { IAxiosError } from '@/interface/IAxiosErrRes';
import { Messages } from '@/lib/messages';

const loginSchema = yup.object().shape({
  mobileNumber: yup
    .string()
    // .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
    .required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface ILoginContainerProps {
  setDialogOpen: (value: boolean) => void;
  setSignUpDialogOpen: (event: React.FormEvent) => void;
  setForgotPasswordDialogOpen: (event: React.FormEvent) => void;
}
const LoginContainer = ({ setDialogOpen, setSignUpDialogOpen, setForgotPasswordDialogOpen }: ILoginContainerProps) => {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginForm = useForm<ILoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: ILoginFormValues) => {
    const url = API_ENDPOINTS.auth.loginUser();
    const config = {
      method: 'post',
      url: url,
      data: {
        ...data,
        ...(process.env.NEXT_PUBLIC_EMAIL_OR_SMS === 'SMS'
          ? { mobileNumber: '+91' + data.mobileNumber }
          : { email: data.mobileNumber }),
        emailOrSms: process.env.NEXT_PUBLIC_EMAIL_OR_SMS || 'Email',
      },
    };
    try {
      setIsLoading(true);
      const responseData = await makeRequest(config);
      if (responseData) {
        if (responseData.data.requires2FA) {
          //direct to signup with mobile number
          router.push(`/login/verify?mobileNumber=${data.mobileNumber}`);
          return;
        }
        localStorage.setItem('profileUrl', responseData.data.profileUrl);
        login(responseData.data.token);
        localStorage.setItem('userId', responseData.data.userId);
        router.push('/home');
        setDialogOpen(false);
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
      {/* {isLoading && <LoaderComponent />} */}
      <LoginView
        isLoading={isLoading}
        loginForm={loginForm}
        loginSubmit={onSubmit}
        setSignUpDialogOpen={setSignUpDialogOpen}
        togglePasswordVisibility={togglePasswordVisibility}
        showPassword={showPassword}
        setForgotPasswordDialogOpen={setForgotPasswordDialogOpen}
      />
    </div>
  );
};

export default LoginContainer;
