import React, { SyntheticEvent, useState } from 'react';
import Auth from '../../../utils/authentication';
import { Redirect } from 'react-router-dom';
import routeConfig from '../../../routes.config';
import HelmetConfig from '../../helmet/HelmetConfig';

const SignIn = ({ component, ...rest }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    Auth.signIn(username, password)
      .then(v => {
        setRedirectToReferrer(true);
      })
      .catch(reason => {
        if (reason.data.message) {
          setAuthError(reason.data.message);
        }
      });
  };

  if (!Auth.isAuthenticated && !redirectToReferrer) {
    return (
      <div>
        <HelmetConfig title="Autenticação" />
        <p>You must log in to view the page</p>
        {authError.length > 0 && <p>Erro: {authError}</p>}
        <form onSubmit={e => handleSubmit(e)}>
          <input
            type="text"
            name="username"
            autoComplete="on"
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            autoComplete="off"
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit"></button>
        </form>
      </div>
    );
  } else {
    return <Redirect to={{ pathname: routeConfig.homepage }} />;
  }
};

export default SignIn;
