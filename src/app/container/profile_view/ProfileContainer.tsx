import { ProfileDetails } from '@/app/_components/profile_view';
import LoaderComponent from '@/components/LoaderComponent';
import {
  IProduct,
  IProfileFormValues,
  IUser,
  IUserFormValues,
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

const userSchema = yup.object().shape({
  id: yup.string().required('ID is required'),
  firstName: yup.string().required('First name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  mobileNumber: yup
    .string()
    .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
    .required('Mobile number is required'),
  college: yup.string().required('College is required'),
  address: yup.string().required('Address is required'),
  contactNumber: yup
    .string()
    .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
    .required('Mobile number is required'),
});

const ProfileContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState<number>(1);

  const profileForm = useForm<IUserFormValues>({
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    console.log(localStorage.getItem('productId'));
    getUserProducts();
    getUserProfile();
  }, []);

  const getUserProducts = async () => {
    const url = API_ENDPOINTS.product.getUserProducts();
    console.log(url);
    const config = {
      method: 'get',
      url: url,
    };
    try {
      setIsLoading(true);
      const responseData: { data: IProduct[] } = await makeRequest(config);
      if (responseData) {
        setProducts(responseData.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserProfile = async () => {
    const url = API_ENDPOINTS.user.userprofile();
    console.log(url);
    const config = {
      method: 'get',
      url: url,
    };
    try {
      setIsLoading(true);
      const responseData: { data: IUser } = await makeRequest(config);
      if (responseData) {
        const user = responseData.data;
        profileForm.reset({
          id: user.id,
          firstName: user.firstName,
          email: user.email,
          mobileNumber: user.mobileNumber,
          college: user.college,
          address: user.address.length > 0 ? user.address[0].address : '',
          contactNumber:
            user.address.length > 0 ? user.address[0].mobileNumber : '',
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectPage = (pageNumber: number) => {
    setSelectedPage(pageNumber);
  };

  const onProfileSubmit = async (data: IUserFormValues) => {
    const url = API_ENDPOINTS.user.saveProfile();
    const config = {
      method: 'post',
      url: url,
      data: data,
    };
    try {
      setIsLoading(true);
      const responseData = await makeRequest(config);
      if (responseData) {
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
      <ProfileDetails
        products={products}
        router={router}
        step={step}
        setStep={setStep}
        selectPage={selectPage}
        selectedPage={selectedPage}
        profileForm={profileForm}
        onProfileSubmit={onProfileSubmit}
      />
    </div>
  );
};

export default ProfileContainer;
