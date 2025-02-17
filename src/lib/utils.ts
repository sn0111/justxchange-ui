import { toast, ToastOptions } from 'react-toastify';

// here we define common functions that will be used in the application
export const trimSpacesBetween = (name: string) => {
  return name.replace(/\s+/g, ' ').trim();
};
export const convertCamelToTitleCase = (camelCaseStr: string) => {
  const titleCaseStr = camelCaseStr.replace(/([a-z])([A-Z])/g, '$1 $2');
  return titleCaseStr;
};

// Toast configuration options
const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const notifySuccess = (message: string, options?: ToastOptions) => {
  toast.success(message, { ...defaultOptions, ...options });
};

export const notifyError = (message: string, options?: ToastOptions) => {
  toast.error(message, { ...defaultOptions, ...options });
};

export const notifyInfo = (message: string, options?: ToastOptions) => {
  toast.info(message, { ...defaultOptions, ...options });
};

export const notifyWarning = (message: string, options?: ToastOptions) => {
  toast.warn(message, { ...defaultOptions, ...options });
};

export const formatProductDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };

  return date.toLocaleString('en-US', options);
};

export const getConditionStyles = (condition: string) => {
  switch (condition) {
    case 'New':
      return 'from-green-400/20 to-green-700/20 border-green-500/30'; // Brighter green
    case 'Like New':
      return 'from-emerald-500/20 to-teal-700/20 border-teal-600/30'; // Darker greenish-blue
    case 'Used':
      return 'from-pink-500/20 to-purple-500/20 border-purple-500/30'; // Existing pink-purple
    case 'Heavily Used':
      return 'from-red-600/20 to-rose-800/20 border-red-700/30'; // Dark, worn-out red
    default:
      return 'from-gray-400/20 to-gray-600/20 border-gray-500/30'; // Fallback for unexpected values
  }
};
