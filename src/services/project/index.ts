import IProject from '../../interfaces/IProject';
import authenticatedAxios from '../authenticatedAxios';

export function getProject(projectId: string): Promise<IProject> {
  return new Promise<IProject>((resolve, reject) => {
    authenticatedAxios
      .get<IProject>(`/projects/${projectId}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}

export function addProject(project: IProject): Promise<IProject> {
  return new Promise<IProject>((resolve, reject) => {
    authenticatedAxios
      .post<IProject>('/projects', project)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}

export function updateProject(
  projectId: string,
  project: IProject
): Promise<IProject> {
  return new Promise<IProject>((resolve, reject) => {
    authenticatedAxios
      .put<IProject>(`/projects/${projectId}`, project)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}

export function getAllMilestones(projectId: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    authenticatedAxios
      .get<string[]>(`/projects/${projectId}/milestones`)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
