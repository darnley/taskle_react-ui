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
import { faPlus, faTag, faLink } from '@fortawesome/free-solid-svg-icons';
import IMilestoneApi from '../../../interfaces/IMilestoneApi';
import { getAllMilestones } from '../../../services/project';

import './styles.scss';

export interface IProjectTasksProps {}

const ProjectTasks: React.FunctionComponent<IProjectTasksProps> = props => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const sidebarContext = useContext(SidebarContext);
  const [milestones, setMilestones] = useState<IMilestoneApi[]>([]);

  useEffect(() => {
    getAllTasks(projectId!.toString()).then(res => {
      setTasks(res);
    });

    getAllMilestones(projectId!)
      .then(res => {
        setMilestones(res.filter(m => m.name !== null));
      })
      .catch(err => console.error(err));
  }, [projectId]);

  const updateTaskList = () => {
    getAllMilestones(projectId!)
      .then(res => {
        setMilestones(res.filter(m => m.name !== null));

        getAllTasks(projectId!.toString()).then(res => {
          setTasks([]);
          setTasks(res);
        });
      })
      .catch(err => console.error(err));

    sidebarContext.removeSidebarComponent();
  };

  const taskWithNoMilestone = (t: ITask) =>
    milestones.findIndex(m => m.name === t.milestone) === -1;

  return (
    <Container fluid>
      <Row className="project-tasks-menu">
        <div className="text-right w-100">
          <Button
            variant="primary"
            onClick={() =>
              sidebarContext.setSidebarComponent(
                <TaskAdd projectId={projectId!} onSuccess={updateTaskList} />
              )
            }
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1" /> Criar nova tarefa
          </Button>
        </div>
      </Row>
      <Row className="project-tasks-list mt-3">
        {/* Para tarefas que possuem marco de projeto */}
        {milestones.map(milestone => (
          <>
            <a
              href={`#milestone-${milestone.name.toLowerCase()}`}
              className="milestone-divider mt-1"
              id={`milestone-${milestone.name.toLowerCase()}`}
            >
              {milestone.name}
              <FontAwesomeIcon icon={faLink} className="ml-1" />
            </a>
            {tasks
              .filter(t => t.milestone === milestone.name)
              .map(task => (
                <Task task={task} key={task._id} updateFunc={updateTaskList} />
              ))}
          </>
        ))}

        {/* Para tarefas que NÃO possuem marco de projeto */}
        {tasks.filter(taskWithNoMilestone).length > 0 && (
          <>
            <a
              href={`#milestone-sem-marco`}
              className="milestone-divider no-milestone mt-1"
              id={`milestone-sem-marco`}
            >
              <i>Sem marco</i>
              <FontAwesomeIcon icon={faLink} className="ml-1" />
            </a>
            {tasks.filter(taskWithNoMilestone).map(task => (
              <Task task={task} key={task._id} updateFunc={updateTaskList} />
            ))}
          </>
        )}
      </Row>
    </Container>
  );
};

export default ProjectTasks;
