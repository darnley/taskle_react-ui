import TaskStatus from '../enums/TaskStatus';
import IProject from './IProject';
import { IUser } from './IUser';
import TaskComplexity from '../enums/TaskComplexity';

export interface ITask {
  _id: string;
  description: string;
  keywords: string[];
  milestone: string;
  status: TaskStatus;
  isFlagged: boolean;
  project: IProject;
  responsible?: IUser | null;
  complexity: TaskComplexity;
  deliveryDate?: Date;
}
