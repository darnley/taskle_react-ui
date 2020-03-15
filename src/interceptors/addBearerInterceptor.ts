import authentication from '../utils/authentication';
import { AxiosRequestConfig } from 'axios';

const addBearerInterceptor = async (config: AxiosRequestConfig) => {
  let { token } = authentication;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

export default addBearerInterceptor;
