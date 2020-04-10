import authenticatedAxios from '../authenticatedAxios';
import { IUser } from '../../interfaces/IUser';
import routeConfig from '../../routes.config';

const getAuthenticatedUser = (): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    authenticatedAxios
      .get<IUser>(routeConfig.myProfile)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default getAuthenticatedUser;
