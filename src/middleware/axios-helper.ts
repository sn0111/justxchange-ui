import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from '@/lib/constants';

export const makeRequest = async (options: AxiosRequestConfig) => {
  const { url, method = 'GET', headers, data, ...restOptions } = options; // Added method and data
  const fullUrl = `${API_URL}${url}`;

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
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return;
    }
    // if (response.status !== 200) {
    //   throw new Error(Messages.emptyResponseErrorMsg);
    // }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const { status } = error.response;

      if (status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }

      // Handle other status codes (e.g., 403, 404, 500, etc.)
      // console.error(
      //   `Error ${status}: ${error.response.data.message || 'An error occurred.'}`
      // );
      // notifyError(
      //   `Error ${status}: ${error.response.data.message || 'An error occurred.'}`
      // );
    } else {
      // Non-Axios error or unexpected error
      // console.error(`Unexpected error: ${error.message || error}`);
      // notifyError(`Unexpected error: ${error.message || error}`);
    }
    ` `;
    throw error;
  }
};
