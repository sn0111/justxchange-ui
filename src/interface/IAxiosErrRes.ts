import { AxiosRequestConfig } from 'axios';

export interface IAxiosError<T = { exceptionMessage: string }> extends Error {
  config?: AxiosRequestConfig; // The Axios request configuration
  code?: string; // Error code (e.g., "ERR_NETWORK")
  request?: XMLHttpRequest; // The request object
  response?: {
    data: T; // Response data
    status: number; // HTTP status code
    statusText: string; // HTTP status text
    headers: Record<string, string>; // Response headers
  };
  isAxiosError: boolean; // Boolean to distinguish from other error types
  toJSON: () => object; // Axios' `toJSON` method
}
