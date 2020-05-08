import React, { useContext, useState } from 'react';
import { ITask } from '../../../../interfaces/ITask';
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';
import TaskStatusIcon from '../../../icons/TaskStatusIcon';
import TaskComplexityIcon from '../../../icons/TaskComplexityIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';
import UserInfoContext, {
  IUserInfoContext,
} from '../../../../contexts/UserInfoContext';
import { updateTask } from '../../../../services/project/task';
import IProject from '../../../../interfaces/IProject';
import { useToasts } from 'react-toast-notifications';
import SidebarContext from '../../../../contexts/SidebarContext';
import TaskEdit from '../TaskAdd';

export interface ITaskProps {
  task: ITask;
  updateFunc: () => void;
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
          console.log('ok');

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

  return (
    <Card className="w-100 mt-2" key={task._id}>
      <Card.Body className="task-card">
        <Row>
          <Col
            sm={1}
            className="d-flex align-items-center justify-content-center"
          >
            <TaskStatusIcon status={task.status} width="30em" />
          </Col>
          <Col md={8} className="project-task-middle-data">
            <Row className="project-task-top">
              <TaskComplexityIcon complexity={task.complexity} width="30em" />
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
          <Col
            md={3}
            className="d-flex align-items-center justify-content-center"
          >
            <span
              onClick={() =>
                sidebarContext.setSidebarComponent(
                  <TaskEdit
                    taskId={task._id}
                    projectId={(task.project as IProject)._id}
                  />
                )
              }
            >
              Visualizar
            </span>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Task;
