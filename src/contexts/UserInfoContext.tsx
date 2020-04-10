import React from 'react';
import IUserInfoContext from '@app/interfaces/contexts/IUserInfoContext';

const UserInfoContext = React.createContext<IUserInfoContext>({});

export default UserInfoContext;
