import React, { useContext, useState } from 'react';
import { ITask } from '../../../../interfaces/ITask';
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';
import TaskStatusIcon from '../../../icons/TaskStatusIcon';
import TaskComplexityIcon from '../../../icons/TaskComplexityIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames';
import {
  faUser,
  faLink,
  faExternalLinkAlt,
  faEdit,
  faPenSquare,
  faPen,
  faFlag,
} from '@fortawesome/free-solid-svg-icons';
import './styles.scss';
import UserInfoContext, {
  IUserInfoContext,
} from '../../../../contexts/UserInfoContext';
import {
  updateTask,
  getTask,
  finishTask,
} from '../../../../services/project/task';
import IProject from '../../../../interfaces/IProject';
import { useToasts } from 'react-toast-notifications';
import SidebarContext from '../../../../contexts/SidebarContext';
import TaskEdit from '../TaskAdd';
import { Link } from 'react-router-dom';
import TaskStatus from '../../../../enums/TaskStatus';

export interface ITaskProps {
  task: ITask;
  updateFunc: () => void;
  showAsMyTasks?: boolean;
}

const Task: React.FunctionComponent<ITaskProps> = props => {
  const [task, setTask] = useState(props.task);
  const userInfoContext = useContext(UserInfoContext);
  const sidebarContext = useContext(SidebarContext);
  const { addToast } = useToasts();

  const addCurrentUserAsResponsible = (innerTask: ITask) => {
    if (userInfoContext) {
      innerTask.responsible = userInfoContext.user;

      updateTask((innerTask.project as IProject)._id, innerTask._id, innerTask)
        .then(res => {
          setTask(innerTask);

          if (props.updateFunc) {
            props.updateFunc();
          }

          addToast('Você foi colocado como responsável da tarefa.', {
            appearance: 'success',
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const toggleTaskFlag = () => {
    getTask(task.project._id, task._id).then(currentTask => {
      currentTask.isFlagged = !currentTask.isFlagged;

      updateTask(task.project._id, task._id, currentTask).then(() => {
        setTask(currentTask);
      });
    });
  };

  const handleTaskFinishing = () => {
    if (task.status === TaskStatus.Finished) {
      return;
    }

    finishTask(task.project._id, task._id).then(currentTask => {
      currentTask.status = TaskStatus.Finished;

      setTask({ ...currentTask, project: task.project });
      addToast('A tarefa foi finalizada.', { appearance: 'success' });
    });
  };

  const toggleTaskStatus = () => {
    getTask(task.project._id, task._id)
      .then(currentTask => {
        if (currentTask.status === TaskStatus.NotStarted) {
          currentTask.status = TaskStatus.Started;
        } else if (currentTask.status === TaskStatus.Started) {
          currentTask.status = TaskStatus.NotStarted;
        } else if (currentTask.status === TaskStatus.Finished) {
          currentTask.status = TaskStatus.Started;
        }

        updateTask(task.project._id, task._id, currentTask)
          .then(() => {
            currentTask.project = task.project;
            setTask(currentTask);

            addToast(
              <span>
                <i>Status</i> da tarefa foi alterado.
              </span>,
              { appearance: 'success' }
            );
          })
          .catch(err => {
            console.error(err);
            addToast(
              <span>
                Ocorreu um erro ao atualizar o <i>status</i> da tarefa.
              </span>,
              { appearance: 'error' }
            );
          });
      })
      .catch(err => {
        console.error(err);
        addToast('Ocorreu um erro ao obter a tarefa.', { appearance: 'error' });
      });
  };

  return (
    <Card
      className={classNames({
        'w-100': true,
        'mt-2': true,
        'task-flagged': task.isFlagged,
      })}
      key={task._id}
    >
      <Card.Body className="task-card">
        <Row>
          <Col
            sm={2}
            className="d-flex align-items-center justify-content-center"
          >
            <TaskStatusIcon
              status={task.status}
              width="30em"
              showAsMyTasks={props.showAsMyTasks}
              onClickToggleTaskStatus={toggleTaskStatus}
              onClickFinishTask={handleTaskFinishing}
            />
          </Col>
          <Col md={7} className="project-task-middle-data">
            <Row className="project-task-top">
              <span className="task-complexity">
                <TaskComplexityIcon complexity={task.complexity} width="30em" />
              </span>
              {props.showAsMyTasks && (
                <span className="ml-2 task-project-description text-muted">
                  <Link to={`/projects/${task.project._id}`}>
                    {task.project.name}
                  </Link>

                  {task.milestone && (
                    <>
                      <span className="project-milestone-separator"> / </span>
                      <Link
                        to={`/projects/${
                          task.project._id
                        }#milestone-${task.milestone.toLowerCase()}`}
                      >
                        {task.milestone}
                      </Link>
                    </>
                  )}
                </span>
              )}
            </Row>
            <Row className="project-task-description mt-2">
              {task.description}
            </Row>
            <Row className="project-task-keywords mt-2">
              {task.keywords.map((keyword, index) => (
                <Badge
                  key={`task-${task._id}-keyword-${index}`}
                  variant="secondary"
                  className="mr-1"
                >
                  {keyword}
                </Badge>
              ))}
            </Row>
            <Row className="project-task-footer text-muted mt-2">
              <span className="footer-data">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="mr-1 calendar-icon"
                />
                {task.deliveryDate && (
                  <Moment
                    date={task.deliveryDate}
                    locale="pt-br"
                    format="DD/MMM/YYYY"
                  ></Moment>
                )}
                {!task.deliveryDate && (
                  <span className="no-date">(Sem data)</span>
                )}
              </span>
              <span className="footer-data">
                <FontAwesomeIcon icon={faUser} className="mr-1" />
                {task.responsible &&
                  task.responsible.firstName + ' ' + task.responsible.lastName}
                {!task.responsible && (
                  <Button
                    className="btn-xs"
                    variant="outline-primary"
                    onClick={() => addCurrentUserAsResponsible(task)}
                  >
                    Atribuir a mim
                  </Button>
                )}
              </span>
            </Row>
          </Col>
          <Col md={3} className="align-items-center justify-content-center">
            <Button
              variant="outline-primary"
              onClick={() =>
                sidebarContext.setSidebarComponent(
                  <TaskEdit
                    taskId={task._id}
                    projectId={(task.project as IProject)._id}
                    onSuccess={props.updateFunc}
                  />
                )
              }
              className="h-100 float-right"
              title="Editar a tarefa"
            >
              <FontAwesomeIcon icon={faPen} />
            </Button>
            {!props.showAsMyTasks && (
              <Button
                variant="link"
                onClick={toggleTaskFlag}
                className={`h-100 float-right mr-1 task-flag${
                  task.isFlagged ? ' task-is-flagged' : ' task-is-not-flagged'
                }`}
              >
                <FontAwesomeIcon icon={faFlag} />
              </Button>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Task;
