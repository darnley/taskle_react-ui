import axios from 'axios';
import addBearerInterceptor from '../interceptors/addBearerInterceptor';
import signOutUnauthorizedInterceptor from '../interceptors/signOutOnUnauthorizedInterceptor';

const authenticatedAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
});

authenticatedAxios.interceptors.request.use(addBearerInterceptor);

authenticatedAxios.interceptors.response.use(
  res => res,
  signOutUnauthorizedInterceptor
);

export default authenticatedAxios;
