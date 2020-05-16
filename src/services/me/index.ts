import authenticatedAxios from '../authenticatedAxios';
import { ITask } from '../../interfaces/ITask';

export function getMyTasks(): Promise<ITask[]> {
  return new Promise<ITask[]>((resolve, reject) => {
    authenticatedAxios
      .get<ITask[]>('/me/tasks')
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
