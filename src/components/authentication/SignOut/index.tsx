import React, { FunctionComponent } from 'react';
import authentication from '@app/utils/authentication';
import routeConfig from '@app/routes.config';
import { useHistory } from 'react-router-dom';

interface ISignOutProps {}

const SignOut: FunctionComponent<ISignOutProps> = props => {
  authentication.signOut();
  useHistory().push(routeConfig.signIn);

  return <p>Removendo sessão do usuário...</p>;
};

export default SignOut;
