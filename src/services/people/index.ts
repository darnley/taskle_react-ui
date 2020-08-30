import { IUser } from '../../interfaces/IUser';
import authenticatedAxios from '../authenticatedAxios';
import IPersonStats from '../../interfaces/IPersonStats';
import IProject from '../../interfaces/IProject';

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

export function getStatTaskComplexity(userId: string): Promise<IPersonStats[]> {
  if (!userId) {
    throw Error("Param 'userId' is required");
  }

  return new Promise<IPersonStats[]>((resolve, reject) => {
    authenticatedAxios
      .get<IPersonStats[]>(`/people/${userId}/stats/task-complexity`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function getProjects(userId: string): Promise<IProject[]> {
  if (!userId) {
    throw Error("Param 'userId' is required");
  }

  return new Promise<IProject[]>((resolve, reject) => {
    authenticatedAxios
      .get<IProject[]>(`/people/${userId}/projects`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
