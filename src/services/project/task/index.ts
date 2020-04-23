import { ITask } from '../../../interfaces/ITask';
import authenticatedAxios from '../../authenticatedAxios';

export function getAllTasks(projectId: string) {
  return new Promise<ITask[]>((resolve, reject) => {
    authenticatedAxios
      .get<ITask[]>(`/projects/${projectId}/tasks`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
