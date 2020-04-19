import { IUser } from '../../interfaces/IUser';
import authenticatedAxios from '../authenticatedAxios';

export function getAll(): Promise<IUser[]> {
  return new Promise<IUser[]>((resolve, reject) => {
    authenticatedAxios
      .get<IUser[]>('/people')
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function add(): Promise<IUser> {
  return new Promise<IUser>((resolve, reject) => {
    authenticatedAxios
      .post<IUser>('/people')
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function get(userId: string): Promise<IUser> {
  if (!userId) {
    throw Error("Param 'userId' is required.");
  }

  return new Promise<IUser>((resolve, reject) => {
    authenticatedAxios
      .get<IUser>(`/people/${userId}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
