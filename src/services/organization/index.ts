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
