import { AxiosError } from 'axios';
import authentication from '../utils/authentication';
import routeConfig from '../routes.config';

const signOutUnauthorizedInterceptor = (err: AxiosError) => {
  if (err.response?.status === 401 && err.response.data === 'Unauthorized') {
    authentication.signOut();
    window.location.href = routeConfig.signIn;
  }

  return Promise.reject(err);
};

export default signOutUnauthorizedInterceptor;
