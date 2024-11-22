export interface ILoginFormValues {
  mobileNumber: string;
  password: string;
}

export interface IMobileFormValues {
  mobileNumber: string;
}

export interface IOTPFormValues {
  otp: string;
}

export interface IProfileFormValues {
  firstName: string;
  email: string;
  password: string;
  college: string;
}

export interface IUser {
  id: string;
  userId: number;
  firstName: string;
  lastName: string | null;
  email: string;
  mobileNumber: string;
  password: string;
  emailVerified: boolean;
  mobileVerified: boolean;
  college: string;
  createdDate: string;
  updatedDate: string;
  createdBy: number;
  updatedBy: number;
  otp: string | null;
  otpExpiry: string | null;
}
