import React, { FunctionComponent } from 'react';
import Helmet from 'react-helmet';
import ITitleProps from '@app/interfaces/props/ITitleProps';

const HelmetConfig: FunctionComponent<ITitleProps> = props => {
  var title = 'Taskle';

  if (props.title) {
    title = `Taskle - ${props.title}`;
  }

  return <Helmet title={title} />;
};

export default HelmetConfig;
