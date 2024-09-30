import axios, { AxiosRequestConfig } from 'axios';
import { Messages } from '@/lib/messages';
import { API_URL } from '@/lib/constants';

export const makeRequest = async (options: AxiosRequestConfig) => {
  const { url, ...restOptions } = options;

  const fullUrl = `${API_URL}${url}`;

  try {
    const response = await axios.request({
      ...restOptions,
      url: fullUrl,
    });
    if (response.status !== 200) {
      throw new Error(Messages.emptyResponseErrorMsg);
    }
    return response.data;
  } catch (error) {
    // toast.error(`An error occurred: ${error}`);
    throw error;
  }
};
