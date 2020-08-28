import React, {
  FunctionComponent,
  useState,
  useContext,
  useEffect,
} from 'react';
import { useParams } from 'react-router-dom';
import { ITask } from '../../../interfaces/ITask';
import SidebarContext from '../../../contexts/SidebarContext';
import { getAllTasks } from '../../../services/project/task';
import { Container, Row, Button } from 'react-bootstrap';
import TaskAdd from '../../projects/ProjectTasks/TaskAdd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Task from '../../projects/ProjectTasks/Task';
import { getMyTasks } from '../../../services/me';
import Skeleton from 'react-loading-skeleton';

interface IMyTasksProps { }

const MyTasks: FunctionComponent<IMyTasksProps> = props => {
  const [tasks, setTasks] = useState<ITask[]>();
  const [areTasksGot, setAreTasksGot] = useState<boolean>(false);
  const sidebarContext = useContext(SidebarContext);

  useEffect(() => {
    updateTaskList();
  }, []);

  const updateTaskList = () => {
    getMyTasks().then(res => {
      setTasks([]);
      setTasks(res);
      setAreTasksGot(true);
    });
  };

  const taskCallback = () => {
    console.log('Updating task list...');
    updateTaskList();
    sidebarContext.removeSidebarComponent();
  };

  return (
    <Container fluid>
      <Row className="project-tasks-list mt-3">
        {!areTasksGot && <Skeleton height={110} count={3} />}
        {tasks?.map(task => (
          <Task
            task={task}
            key={task._id}
            updateFunc={taskCallback}
            showAsMyTasks
          />
        ))}
      </Row>
    </Container>
  );
};

export default MyTasks;
