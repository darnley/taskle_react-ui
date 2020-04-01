import React, { FunctionComponent } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

interface IMyProjectsProps {}

const MyProjects: FunctionComponent<IMyProjectsProps> = props => {
  return (
    <>
      <h1>Página Meus projetos</h1>
      <LinkContainer to="/me/projects/create">
        <button>Clique</button>
      </LinkContainer>
    </>
  );
};

export default MyProjects;
