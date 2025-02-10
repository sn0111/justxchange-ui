import Button from '@/components/Button';
import { IUserFormValues } from '@/interface';
import Image from 'next/image';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface IUserProfile {
  profileForm: UseFormReturn<IUserFormValues>;
  onProfileSubmit: (data: IUserFormValues) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

const UserProfile = ({
  profileForm,
  onProfileSubmit,
  fileInputRef,
  handleFileChange,
  isLoading
}: IUserProfile) => {

  const inputClass = `w-full px-4 py-3 bg-white/10 border border-black/20 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300
  hover:border-purple-500  // Add this line for hover border color
  [&:-webkit-autofill]:bg-black/10
  [&:-webkit-autofill]:text-black
  [&:-webkit-autofill]:shadow-[0_0_0_30px_rgb(0,0,0/0.1)_inset]
  [&:-webkit-autofill]:[text-fill-color:rgb(255,255,255)]`;

  return (
    <main className="flex-1 p-4 lg:p-6 flex justify-center items-center">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl lg:min-h-[80vh]">
        <div className="flex items-center justify-center mb-6">
          <Image
            src={profileForm.watch('profileUrl')}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full object-cover hover:cursor-pointer"
            height={24}
            width={24}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-black text-sm font-bold mb-1">
                User Name
              </label>
            <input
              {...profileForm.register('firstName')}
              type="text"
              id="firstName"
              className={inputClass}
            />
            {profileForm.formState.errors.firstName && (
              <p className="text-pink-400 text-xs mt-1">
                {profileForm.formState.errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-1" htmlFor="email">
              Email
            </label>
            <input
              {...profileForm.register('email')}
              type="email"
              id="email"
              disabled
              className={inputClass}
            />
            {profileForm.formState.errors.email && (
              <p className="text-pink-400 text-xs mt-1">
                {profileForm.formState.errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-1" htmlFor="mobileNumber">
              Registered Number
            </label>
            <input
              {...profileForm.register('mobileNumber')}
              type="tel"
              id="mobileNumber"
              disabled
              className={inputClass}
            />
            {profileForm.formState.errors.mobileNumber && (
              <p className="text-pink-400 text-xs mt-1">
                {profileForm.formState.errors.mobileNumber.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-black text-sm font-bold mb-1" htmlFor="contactNumber">
              Contact Number
            </label>
            <input
              {...profileForm.register('contactNumber')}
              type="tel"
              id="contactNumber"
              className={inputClass}
            />
            {profileForm.formState.errors.contactNumber && (
              <p className="text-pink-400 text-xs mt-1">
                {profileForm.formState.errors.contactNumber.message}
              </p>
            )}
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-black text-sm font-bold mb-1" htmlFor="college">
              College
            </label>
            <input
              {...profileForm.register('college')}
              type="text"
              className={inputClass}
            />
            {profileForm.formState.errors.college && (
              <p className="text-pink-400 text-xs mt-1">
                {profileForm.formState.errors.college.message}
              </p>
            )}
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-black text-sm font-bold mb-1" htmlFor="address">
              Address
            </label>
            <textarea
              {...profileForm.register('address')}
              className={inputClass}
            />
            {profileForm.formState.errors.address && (
              <p className="text-pink-400 text-xs mt-1">
                {profileForm.formState.errors.address.message}
              </p>
            )}
          </div>
          <div className="sm:flex">
            <div className="col-span-1 md:col-span-2 flex">
              <label className="block text-black text-sm font-bold mb-1 pr-3" htmlFor="is2FAEnabled">
                Enable 2FA
              </label>
              <div
                className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full ${
                  profileForm.watch('is2FAEnabled') ? 'bg-purple-500' : 'bg-gray-300'
                }`}
                onClick={() =>
                  profileForm.setValue(
                    'is2FAEnabled',
                    !profileForm.getValues('is2FAEnabled')
                  )
                }
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
                    profileForm.watch('is2FAEnabled') ? 'translate-x-5' : 'translate-x-1'
                  }`}
                ></span>
              </div>
              <input
                type="checkbox"
                id="is2FAEnabled"
                {...profileForm.register('is2FAEnabled')}
                className="hidden"
              />
            </div>
            <div className="col-span-1 md:col-span-2 flex sm:pl-5">
              <label className="block text-black text-sm font-bold mb-1 pr-3" htmlFor="isContactView">
                Contact No View
              </label>
              <div
                className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full ${
                  profileForm.watch('isContactView') ? 'bg-purple-500' : 'bg-gray-300'
                }`}
                onClick={() =>
                  profileForm.setValue(
                    'isContactView',
                    !profileForm.getValues('isContactView')
                  )
                }
              > 
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
                    profileForm.watch('isContactView') ? 'translate-x-5' : 'translate-x-1'
                  }`}
                ></span>
              </div>
              <input
                type="checkbox"
                id="isContactView"
                {...profileForm.register('isContactView')}
                className="hidden"
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex items-center justify-center">
            <Button
              isLoading={isLoading}
              className="w-full py-3 h-12 flex items-center justify-center"
              borderRadius="roundedXl"
              onClick={profileForm.handleSubmit(onProfileSubmit)}
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UserProfile;