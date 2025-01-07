import { IUserFormValues } from '@/interface';
import Image from 'next/image';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface IUserProfile {
  profileForm: UseFormReturn<IUserFormValues>;
  onProfileSubmit: (data: IUserFormValues) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserProfile = ({
  profileForm,
  onProfileSubmit,
  fileInputRef,
  handleFileChange,
}: IUserProfile) => {
  return (
    <main className="flex-1 p-4 lg:p-6 flex justify-center items-center">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl lg:max-h-[80vh] lg:min-h-[80vh]">
        <div className="flex items-center justify-center mb-6">
          <Image
            src={
              profileForm.watch('profileUrl')
                ? profileForm.watch('profileUrl')
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s'
            } // Replace with actual image path
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
          onSubmit={profileForm.handleSubmit(onProfileSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label
              className="block text-gray-600 text-sm mb-2"
              htmlFor="firstName"
            >
              User Name
            </label>
            <input
              {...profileForm.register('firstName')}
              type="text"
              id="firstName"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {profileForm.formState.errors.firstName && (
              <p className="text-red-500 text-xs">
                {profileForm.formState.errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              {...profileForm.register('email')}
              type="email"
              id="email"
              disabled
              className="border block disabled:opacity-50 disabled:pointer-events-none disabled:bg-gray-100 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {profileForm.formState.errors.email && (
              <p className="text-red-500 text-xs">
                {profileForm.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="">
            <label
              className="block text-gray-600 text-sm mb-2"
              htmlFor="contactNumber"
            >
              Registered Number
            </label>
            <input
              {...profileForm.register('mobileNumber')}
              type="tel"
              id="registeredNumber"
              disabled
              className="border block disabled:opacity-50 disabled:pointer-events-none disabled:bg-gray-100 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {profileForm.formState.errors.mobileNumber && (
              <p className="text-red-500 text-xs">
                {profileForm.formState.errors.mobileNumber.message}
              </p>
            )}
          </div>
          <div className="">
            <label
              className="block text-gray-600 text-sm mb-2"
              htmlFor="contactNumber"
            >
              Contact Number
            </label>
            <input
              {...profileForm.register('contactNumber')}
              type="tel"
              id="contactNumber"
              placeholder=""
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {profileForm.formState.errors.contactNumber && (
              <p className="text-red-500 text-xs">
                {profileForm.formState.errors.contactNumber.message}
              </p>
            )}
          </div>
          <div className="col-span-1 md:col-span-2">
            <label
              className="block text-gray-600 text-sm mb-2"
              htmlFor="address"
            >
              Collage
            </label>
            <input
              {...profileForm.register('college')}
              type="text"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {profileForm.formState.errors.college && (
              <p className="text-red-500 text-xs">
                {profileForm.formState.errors.college.message}
              </p>
            )}
          </div>
          <div className="col-span-1 md:col-span-2">
            <label
              className="block text-gray-600 text-sm mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <textarea
              {...profileForm.register('address')}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {profileForm.formState.errors.address && (
              <p className="text-red-500 text-xs">
                {profileForm.formState.errors.address.message}
              </p>
            )}
          </div>
          <div className="sm:flex">
            <div className="col-span-1 md:col-span-2 flex">
              <label
                className="block text-gray-600 text-sm mb-2 pr-3"
                htmlFor="is2FAEnabled"
              >
                Enable 2FA
              </label>
              <div
                className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full ${
                  profileForm.watch('is2FAEnabled')
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
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
                    profileForm.watch('is2FAEnabled')
                      ? 'translate-x-5'
                      : 'translate-x-1'
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
              <label
                className="block text-gray-600 text-sm mb-2 pr-3"
                htmlFor="isContactView"
              >
                Contact No View
              </label>
              <div
                className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full ${
                  profileForm.watch('isContactView')
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
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
                    profileForm.watch('isContactView')
                      ? 'translate-x-5'
                      : 'translate-x-1'
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
            <button
              type="submit"
              className="ml-4 text-blue-500 hover:text-blue-700 border border-blue-500 hover:border-blue-700 px-4 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UserProfile;
