import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Button, Card, Col } from 'react-bootstrap';
import { ITask } from '../../../interfaces/ITask';
import { getAllTasks } from '../../../services/project/task';
import TaskStatusIcon from '../../icons/TaskStatusIcon';
import TaskComplexityIcon from '../../icons/TaskComplexityIcon';

export interface IProjectTasksProps {}

const ProjectTasks: React.FunctionComponent<IProjectTasksProps> = props => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState<ITask[]>();

  useEffect(() => {
    getAllTasks(new String(projectId).toString()).then(res => {
      setTasks(res);
    });
  }, [projectId]);

  return (
    <Container fluid>
      <Row className="project-tasks-menu">
        <Button variant="primary">Criar nova tarefa</Button>
      </Row>
      <Row className="project-tasks-list mt-3">
        {tasks?.map(task => (
          <Card className="w-100 mt-2" key={task._id}>
            <Card.Body>
              <Row>
                <Col sm={1} className="text-center">
                  <TaskStatusIcon status={task.status} width="30em" />
                </Col>
                <Col md={8}>
                  <TaskComplexityIcon
                    complexity={task.complexity}
                    width="30em"
                  />
                  {task.description}
                  {task.complexity}
                </Col>
                <Col md={3}>show</Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default ProjectTasks;
