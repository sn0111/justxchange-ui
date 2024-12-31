import { ProfileDetails } from '@/app/_components/profile_view';
import LoaderComponent from '@/components/LoaderComponent';
import {
  IProduct,
  IUser,
  IUserFormValues,
} from '@/interface';
import { IAxiosError } from '@/interface/IAxiosErrRes';
import { Messages } from '@/lib/messages';
import { notifyError, notifySuccess } from '@/lib/utils';
import { makeRequest } from '@/middleware/axios-helper';
import { API_ENDPOINTS } from '@/services/hooks/apiEndPoints';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const userSchema = yup.object().shape({
  // id: yup.string().required('ID is required'),
  firstName: yup.string().required('First name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  mobileNumber: yup
    .string()
    // .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
    .required('Mobile number is required'),
  college: yup.string().required('College is required'),
  address: yup.string().required('Address is required'),
  contactNumber: yup
    .string()
    // .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
    .required('Contact number is required'),
    is2FAEnabled: yup.boolean().default(false),
  profileUrl: yup.string().required("Profile image required")
});

const ProfileContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [wishLists, setWishLists] = useState<IProduct[]>([]);
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  

  const profileForm = useForm<IUserFormValues>({
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    console.log(localStorage.getItem('productId'));
    getUserProducts();
    getUserProfile();
    getUserWishlists();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadProductImage(file);
    }
  };

  const uploadProductImage = async (file: File) => {
    const url = API_ENDPOINTS.product.getImage();
    const formData = new FormData();
    formData.append('image', file, file.name);

    const config = {
      method: 'POST',
      url: url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      setIsLoading(true);
      const responseData: { imageUrl: string; message: string } =
        await makeRequest(config);
      if (responseData) {
        profileForm.setValue('profileUrl', responseData.imageUrl)
        notifySuccess('Image uploaded successfully');
      }
    } catch (err) {
      console.log(err);
      notifyError('Image upload failed');
    } finally {
      setIsLoading(false);
    }
  };

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
          // id: user.id,
          firstName: user.firstName,
          email: user.email,
          mobileNumber: user.mobileNumber,
          college: user.college,
          address: user.address.length > 0 ? user.address[0].address : '',
          contactNumber:
            user.address.length > 0 ? user.address[0].mobileNumber : '',
          is2FAEnabled: user.is2FAEnabled,
          profileUrl: user.profileUrl
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
        notifySuccess(responseData.data)
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

  const getUserWishlists = async () => {
    const url = API_ENDPOINTS.product.getWishlists();
    const config = {
      method: 'get',
      url: url,
    };
    try {
      setIsLoading(true);
      const responseData: { data: IProduct[] } = await makeRequest(config);
      if (responseData) {
        setWishLists(responseData.data);
      }
    } catch (err) {
      console.log(err);
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
        wishLists={wishLists}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
      />
    </div>
  );
};

export default ProfileContainer;
