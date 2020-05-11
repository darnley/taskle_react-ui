import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Button, Card, Col, Badge } from 'react-bootstrap';
import { ITask } from '../../../interfaces/ITask';
import { getAllTasks } from '../../../services/project/task';
import TaskStatusIcon from '../../icons/TaskStatusIcon';
import TaskComplexityIcon from '../../icons/TaskComplexityIcon';
import Moment from 'react-moment';
import 'moment/locale/pt-br';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import Task from './Task';
import SidebarContext from '../../../contexts/SidebarContext';
import TaskAdd from './TaskAdd';

export interface IProjectTasksProps {}

const ProjectTasks: React.FunctionComponent<IProjectTasksProps> = props => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState<ITask[]>();
  const sidebarContext = useContext(SidebarContext);

  useEffect(() => {
    getAllTasks(projectId!.toString()).then(res => {
      setTasks(res);
    });
  }, [projectId]);

  const updateTaskList = () => {
    console.log('Updating task list...');
    getAllTasks(projectId!.toString()).then(res => {
      setTasks([]);
      setTasks(res);
    });
    sidebarContext.removeSidebarComponent();
  };

  return (
    <Container fluid>
      <Row className="project-tasks-menu">
        <Button
          variant="primary"
          onClick={() =>
            sidebarContext.setSidebarComponent(
              <TaskAdd projectId={projectId!} onSuccess={updateTaskList} />
            )
          }
        >
          Criar nova tarefa
        </Button>
      </Row>
      <Row className="project-tasks-list mt-3">
        {tasks?.map(task => (
          <Task task={task} key={task._id} updateFunc={updateTaskList} />
        ))}
      </Row>
    </Container>
  );
};

export default ProjectTasks;
