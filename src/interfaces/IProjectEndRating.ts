import { IUser } from './IUser';
import IProject from './IProject';

export default interface IProjectEndRating {
  user: IUser;
  project: IProject;
  starRating: number;
}
