import { toast } from 'react-toastify';

// here we define common functions that will be used in the application
export const trimSpacesBetween = (name: string) => {
  return name.replace(/\s+/g, ' ').trim();
};
export const convertCamelToTitleCase = (camelCaseStr: string) => {
  const titleCaseStr = camelCaseStr.replace(/([a-z])([A-Z])/g, '$1 $2');
  return titleCaseStr;
};

// Toast configuration options
const defaultOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const notifySuccess = (message: string, options?: object) => {
  toast.success(message, { ...defaultOptions, ...options });
};

export const notifyError = (message: string, options?: object) => {
  toast.error(message, { ...defaultOptions, ...options });
};

export const notifyInfo = (message: string, options?: object) => {
  toast.info(message, { ...defaultOptions, ...options });
};

export const notifyWarning = (message: string, options?: object) => {
  toast.warn(message, { ...defaultOptions, ...options });
};
