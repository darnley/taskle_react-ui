import { IOrganizationStatistics } from '../../interfaces/IOrganizationStats';
import authenticatedAxios from '../authenticatedAxios';

export function getOrganizationStats(): Promise<IOrganizationStatistics> {
  return new Promise<IOrganizationStatistics>((resolve, reject) => {
    authenticatedAxios
      .get(`/org/stats/task-count`)
      .then(res => {
        resolve(res.data);
      })
      .catch(reject);
  });
}

export function getPeopleCount(): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    authenticatedAxios
      .get(`/org/stats/people-count`)
      .then(res => {
        resolve(res.data.peopleCount);
      })
      .catch(reject);
  });
}
