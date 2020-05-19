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

export function updateTask(projectId: string, taskId: string, task: ITask) {
  return new Promise<ITask>((resolve, reject) => {
    authenticatedAxios
      .put<ITask>(`/projects/${projectId}/tasks/${taskId}`, task)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function getTask(projectId: string, taskId: string) {
  return new Promise<ITask>((resolve, reject) => {
    authenticatedAxios
      .get(`/projects/${projectId}/tasks/${taskId}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function createTask(projectId: string, task: ITask) {
  return new Promise<ITask>((resolve, reject) => {
    authenticatedAxios
      .post<ITask>(`/projects/${projectId}/tasks`, task)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}

export function finishTask(projectId: string, taskId: string) {
  return new Promise<ITask>((resolve, reject) => {
    authenticatedAxios
      .patch<ITask>(`/projects/${projectId}/tasks/${taskId}/finish`)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
