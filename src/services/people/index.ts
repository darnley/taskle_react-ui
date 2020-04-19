import { IUser } from '../../interfaces/IUser';
import authenticatedAxios from '../authenticatedAxios';

export function getAllPeople(): Promise<IUser[]> {
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

export function addPerson(user: IUser): Promise<IUser> {
  if (!user) {
    throw new Error("Param 'user' is required.");
  }

  return new Promise<IUser>((resolve, reject) => {
    authenticatedAxios
      .post<IUser>('/people', user)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function getPerson(userId: string): Promise<IUser> {
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
