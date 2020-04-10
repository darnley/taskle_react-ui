import { IUser } from '../IUser';

export default interface IUserInfoContext {
  user?: IUser;
  getUserInfo?: () => Promise<IUser>;
  checkAuth?: () => Promise<boolean>;
}
