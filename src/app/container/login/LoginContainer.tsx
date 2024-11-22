import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/app/context/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/services/hooks/apiEndPoints';
import { notifyError } from '@/lib/utils';
import { makeRequest } from '@/middleware/axios-helper';
import { ILoginFormValues } from '@/interface';
import LoaderComponent from '@/components/LoaderComponent';
import { LoginView } from '@/app/_components/login';

const loginSchema = yup.object().shape({
  mobileNumber: yup.string().required('Mobile Number is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginContainer = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginForm = useForm<ILoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: ILoginFormValues) => {
    const url = API_ENDPOINTS.auth.loginUser();
    const config = {
      method: 'post',
      url: url,
      data: {
        ...data,
        mobileNumber: '+91' + data.mobileNumber,
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
    } catch (err: any) {
      console.log(err);
      notifyError(err.response.data.exceptionMessage);
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
      <LoginView
        loginForm={loginForm}
        loginSubmit={onSubmit}
        togglePasswordVisibility={togglePasswordVisibility}
        showPassword={showPassword}
      />
    </div>
  );
};

export default LoginContainer;
