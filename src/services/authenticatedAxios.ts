import axios from 'axios';
import addBearerInterceptor from '../interceptors/addBearerInterceptor';
import signOutUnauthorizedInterceptor from '../interceptors/signOutOnUnauthorizedInterceptor';

/**
 * The authenticated Axios instance.
 * It will use some request/response middlewares.
 * When using it, be carefull to the auto logout.
 *
 * @instance
 */
const authenticatedAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
});

// Add Bearer token to every authenticated request
authenticatedAxios.interceptors.request.use(addBearerInterceptor);

// When it receives an 401 error with "Unauthorized" text,
// sign out the current user and force him to log in again
authenticatedAxios.interceptors.response.use(
  res => res,
  signOutUnauthorizedInterceptor
);

export default authenticatedAxios;
