import React from 'react';

export interface IFinishProjectProps {
  projectId: string;
}

const FinishProject: React.FunctionComponent<IFinishProjectProps> = props => {
  return <span>{props.projectId}</span>;
};

export default FinishProject;
