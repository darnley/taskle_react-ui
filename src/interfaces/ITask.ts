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
  project: IProject | string;
  responsible?: IUser | string;
  complexity: TaskComplexity;
  deliveryDate?: Date;
}
