import { IUser } from './IUser';
import ProjectStatus from '../enums/ProjectStatus';
import ITeam from './ITeam';

export interface IProjectVisibility {
  users?: IUser[] | string[];
  teams?: ITeam[] | string[];
}

export default interface IProject {
  _id: string;
  name: string;
  status: ProjectStatus | string;
  description?: string;
  keywords?: string[];
  manager: IUser | string;
  visibility: IProjectVisibility;
}
