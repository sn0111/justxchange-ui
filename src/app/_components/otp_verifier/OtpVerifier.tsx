import { IOTPFormValues } from '@/interface';
import { UseFormReturn } from 'react-hook-form';

interface OtpVerifierProps {
  mobileNumber: string;
  onOtpSubmit: () => void;
  otpForm: UseFormReturn<IOTPFormValues>;
}

export const OtpVerifier: React.FC<OtpVerifierProps> = ({
  mobileNumber,
  onOtpSubmit,
  otpForm,
}) => {
  return (
    <form onSubmit={onOtpSubmit} className="w-full">
      <input
        value={mobileNumber}
        disabled
        placeholder="Mobile number (10 digits)"
        maxLength={10}
        type="tel"
        inputMode="numeric"
        onInput={(e: React.FormEvent<HTMLInputElement>) => {
          const target = e.currentTarget;
          target.value = target.value.replace(/[^0-9]/g, '');
        }}
        className="w-full p-2 border rounded-lg shadow-sm focus:outline-none 
           focus:ring-2 focus:ring-green-500 border-gray-300 
           disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
      <input
        {...otpForm.register('otp')}
        placeholder="Enter OTP"
        className="w-full p-2 mt-2 border rounded-lg"
      />
      {otpForm.formState.errors.otp && (
        <p className="text-red-500">{otpForm.formState.errors.otp.message}</p>
      )}
      <button
        type="submit"
        className="w-full mt-2 p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Verify OTP
      </button>
    </form>
  );
};
