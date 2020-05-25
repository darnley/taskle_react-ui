import IProject from '../../interfaces/IProject';
import authenticatedAxios from '../authenticatedAxios';
import IMilestoneApi from '../../interfaces/IMilestoneApi';
import IProjectEndRating from '../../interfaces/IProjectEndRating';

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

export function getAllMilestones(projectId: string): Promise<IMilestoneApi[]> {
  return new Promise<IMilestoneApi[]>((resolve, reject) => {
    authenticatedAxios
      .get<IMilestoneApi[]>(`/projects/${projectId}/milestones`)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}

export function endProject(
  projectId: string,
  ratings: IProjectEndRating[]
): Promise<IProjectEndRating[]> {
  if (!projectId) {
    throw new Error("Argument 'projectId' is required when ending a project.");
  }

  if (!ratings) {
    throw new Error("Argument 'ratings' is required when ending a project.");
  }

  return new Promise<IProjectEndRating[]>((resolve, reject) => {
    authenticatedAxios
      .post<IProjectEndRating[]>(`/projects/${projectId}/end`, ratings)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
