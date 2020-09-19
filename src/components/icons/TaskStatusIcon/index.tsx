import React from 'react';
import noFillSvg from './svg/task_ellipse_nofill.svg';
import fillSvg from './svg/task_ellipse_fill.svg';
import fullFillSvg from './svg/task_ellipse_fullfill.svg';
import TaskStatus from '../../../enums/TaskStatus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export interface ITaskStatusIconProps {
  status: TaskStatus;
  width?: string;
  height?: string;
  showAsMyTasks?: boolean;
  onClickToggleTaskStatus?: () => void;
  onClickFinishTask?: () => void;
}

const TaskStatusIcon: React.FunctionComponent<ITaskStatusIconProps> = props => {
  const onClickIcon = () => {
    if (props.onClickToggleTaskStatus === undefined) {
      return;
    }

    props.onClickToggleTaskStatus();
  };

  const onClickFinish = () => {
    if (props.onClickFinishTask === undefined) {
      return;
    }

    props.onClickFinishTask();
  };

  const renderTooltipNotStarted = (props: any) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Não iniciada
      </Tooltip>
    );
  };

  const renderTooltipStarted = (props: any) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Iniciada
      </Tooltip>
    );
  };

  const renderTooltipFinished = (props: any) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        Finalizada
      </Tooltip>
    );
  };

  const getCurrentTaskIcon = (
    taskStatus: TaskStatus,
    width: string | undefined,
    height: string | undefined
  ) => {
    const innerWidth = width ?? 'auto';
    const innerHeight = height ?? 'auto';

    if (taskStatus === TaskStatus.NotStarted) {
      return (
        <OverlayTrigger placement="top" overlay={renderTooltipNotStarted}>
          <img
            src={noFillSvg}
            alt="Tarefa não iniciada"
            title="Tarefa não iniciada"
            className="button-task-toggle-status"
            width={innerWidth}
            height={innerHeight}
            onClick={onClickIcon}
          />
        </OverlayTrigger>

      );
    } else if (taskStatus === TaskStatus.Started) {
      return (
        <OverlayTrigger placement="top" overlay={renderTooltipStarted}>
          <img
            src={fillSvg}
            alt="Tarefa iniciada"
            title="Tarefa iniciada"
            className="button-task-toggle-status"
            width={innerWidth}
            height={innerHeight}
            onClick={onClickIcon}
          />
        </OverlayTrigger>
      );
    } else if (taskStatus === TaskStatus.Finished) {
      return (
        <OverlayTrigger placement="top" overlay={renderTooltipFinished}>
          <img
            src={fullFillSvg}
            alt="Tarefa finalizada"
            title="Tarefa finalizada"
            className="button-task-toggle-status"
            width={innerWidth}
            height={innerHeight}
            onClick={onClickIcon}
          />
        </OverlayTrigger>
      );
    }
  };

  return (
    <>
      {getCurrentTaskIcon(props.status, props.width, props.height)}
      {props.showAsMyTasks && (
        <div
          className={`button-task-finish finish-button ${props.status === TaskStatus.Finished ? 'finished' : 'not-finished'
            }`}
          onClick={onClickFinish}
        >
          <FontAwesomeIcon icon={faCheck} className="finish-icon ml-4 mr-1" />
        </div>
      )}
    </>
  );
};

export default TaskStatusIcon;
