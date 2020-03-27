import { AxiosError } from 'axios';
import authentication from '../utils/authentication';
import routeConfig from '../routes.config';

/**
 * When the API returns unauthorized, redirect the user to sign out screen.
 * @param err The Axios error.
 */
const signOutUnauthorizedInterceptor = (err: AxiosError) => {
  if (err.response?.status === 401 && err.response.data === 'Unauthorized') {
    authentication.signOut();
    window.location.href = routeConfig.signIn;
  }

  return Promise.reject(err);
};

export default signOutUnauthorizedInterceptor;
