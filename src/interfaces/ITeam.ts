import { IUser } from './IUser';

export default interface ITeam {
  _id: string;
  name: string;
  users: IUser[];
}
