import authentication from '@app/utils/authentication';
import { AxiosRequestConfig } from 'axios';

/**
 * Interceptor to add the Bearer token.
 * @param config The Axios configuration.
 */
const addBearerInterceptor = async (config: AxiosRequestConfig) => {
  let { token } = authentication;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

export default addBearerInterceptor;
