import { IProjectTaskCountStats } from '../../../interfaces/IProjectTaskCountStats';
import authenticatedAxios from '../../authenticatedAxios';

export function getTaskCount(
  projectId: string
): Promise<IProjectTaskCountStats> {
  return new Promise<IProjectTaskCountStats>((resolve, reject) => {
    authenticatedAxios
      .get<IProjectTaskCountStats>(`/projects/${projectId}/stats/task-count`)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
