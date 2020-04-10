import authenticatedAxios from '../authenticatedAxios';
import IProject from '../../interfaces/IProject';

const getMyProjects = (): Promise<IProject[]> => {
  return new Promise<IProject[]>((resolve, reject) => {
    authenticatedAxios
      .get<IProject[]>('/me/projects')
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default getMyProjects;
