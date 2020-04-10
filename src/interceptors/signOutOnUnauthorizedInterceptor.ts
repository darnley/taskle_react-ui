import { AxiosError } from 'axios';
import authentication from '../utils/authentication';
import routeConfig from '../routes.config';

/**
 * When the API returns unauthorized, redirect the user to sign out screen.
 * @param err The Axios error.
 */
const signOutUnauthorizedInterceptor = (err: AxiosError) => {
  const isNetworkError: boolean =
    err.message === 'Network Error' || err.message.includes('timeout');

  if (
    (err.response?.status === 401 && err.response.data === 'Unauthorized') ||
    isNetworkError
  ) {
    if (!window.location.href.includes(routeConfig.signIn)) {
      authentication.signOut();
      window.location.href =
        routeConfig.signIn + (isNetworkError ? '?err=Network+Error' : '');
    }
  }

  return Promise.reject(err);
};

export default signOutUnauthorizedInterceptor;
