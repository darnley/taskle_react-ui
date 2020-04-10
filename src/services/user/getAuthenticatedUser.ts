import authenticatedAxios from '@app/services/authenticatedAxios';
import { IUser } from '@app/interfaces/IUser';
import routeConfig from '@app/routes.config';

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
