import axios, { AxiosRequestConfig } from 'axios';
import { Messages } from '@/lib/messages';
import { API_URL } from '@/lib/constants';
import { notifyError } from '@/lib/utils';

export const makeRequest = async (options: AxiosRequestConfig) => {
  const { url, method = 'GET', headers, data, ...restOptions } = options; // Added method and data
  const fullUrl = `${API_URL}${url}`;
  console.log(fullUrl);

  try {
    const response = await axios({
      method, // Default to 'GET', but allow other methods like 'POST'
      url: fullUrl,
      data, // Include data for POST or PUT requests
      headers: {
        // 'Content-Type': headers?.['Content-Type'] || 'application/json', // Default to JSON
        ...headers,
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      ...restOptions,
    });

    if (response.status !== 200) {
      throw new Error(Messages.emptyResponseErrorMsg);
    }

    return response.data;
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    notifyError(`${error}`)
    // toast.error(`An error occurred: ${error}`);
    throw error;
  }
};
