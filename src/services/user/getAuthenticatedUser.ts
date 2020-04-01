import authenticatedAxios from '../authenticatedAxios';
import { IUser } from '../../interfaces/IUser';

const getAuthenticatedUser = (): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    authenticatedAxios
      .get<IUser>('/me/profile')
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default getAuthenticatedUser;
