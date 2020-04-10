import React, { FunctionComponent, useContext } from 'react';
import SidebarContext from '../../../contexts/SidebarContext';

interface IMyProjectsProps {}

const MyProjects: FunctionComponent<IMyProjectsProps> = props => {
  const sidebarContext = useContext(SidebarContext);

  return (
    <>
      <button
        onClick={() => {
          sidebarContext.setSidebarComponent(<span>Teste</span>);
        }}
      >
        Clique
      </button>
      <input type="text"></input>
    </>
  );
};

export default MyProjects;
