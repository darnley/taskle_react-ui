import React from 'react';
import { IUser } from '@app/interfaces/IUser';

export interface IUserInfoContext {
  user?: IUser;
  getUserInfo?: () => Promise<IUser>;
  checkAuth?: () => Promise<boolean>;
}

const UserInfoContext = React.createContext<IUserInfoContext>({});

export default UserInfoContext;
