import React from 'react';
import noFillSvg from './svg/task_ellipse_nofill.svg';
import fillSvg from './svg/task_ellipse_fill.svg';
import fullFillSvg from './svg/task_ellipse_fullfill.svg';
import TaskStatus from '../../../enums/TaskStatus';

export interface ITaskStatusIconProps {
  status: TaskStatus;
  width?: string;
  height?: string;
}

const TaskStatusIcon: React.FunctionComponent<ITaskStatusIconProps> = props => {
  const getCurrentTaskIcon = (
    taskStatus: TaskStatus,
    width: string | undefined,
    height: string | undefined
  ) => {
    const innerWidth = width ?? 'auto';
    const innerHeight = height ?? 'auto';

    if (taskStatus === TaskStatus.NotStarted) {
      return (
        <img
          src={noFillSvg}
          alt="Tarefa não iniciada"
          title="Tarefa não iniciada"
          width={innerWidth}
          height={innerHeight}
        />
      );
    } else if (taskStatus === TaskStatus.Started) {
      return (
        <img
          src={fillSvg}
          alt="Tarefa iniciada"
          title="Tarefa iniciada"
          width={innerWidth}
          height={innerHeight}
        />
      );
    } else if (taskStatus === TaskStatus.Finished) {
      return (
        <img
          src={fullFillSvg}
          alt="Tarefa finalizada"
          title="Tarefa finalizada"
          width={innerWidth}
          height={innerHeight}
        />
      );
    }
  };

  return <>{getCurrentTaskIcon(props.status, props.width, props.height)}</>;
};

export default TaskStatusIcon;
