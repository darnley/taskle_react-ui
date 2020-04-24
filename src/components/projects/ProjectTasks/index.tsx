import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Button, Card, Col, Badge } from 'react-bootstrap';
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
                <Col
                  sm={1}
                  className="d-flex align-items-center justify-content-center"
                >
                  <TaskStatusIcon status={task.status} width="30em" />
                </Col>
                <Col md={8} className="project-task-middle-data">
                  <Row className="project-task-top">
                    <TaskComplexityIcon
                      complexity={task.complexity}
                      width="30em"
                    />
                  </Row>
                  <Row className="project-task-description">
                    {task.description}
                  </Row>
                  <Row className="project-task-keywords">
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
                  <Row className="proejct-task-footer">footer</Row>
                </Col>
                <Col
                  md={3}
                  className="d-flex align-items-center justify-content-center"
                >
                  show
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default ProjectTasks;
