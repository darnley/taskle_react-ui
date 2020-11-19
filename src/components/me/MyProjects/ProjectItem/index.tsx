import React, { useContext, useState, useEffect } from 'react';
import IProject from '../../../../interfaces/IProject';
import {
  Card,
  Col,
  Row,
  Button,
  Badge,
  ProgressBar,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import './styles.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import UserInfoContext from '../../../../contexts/UserInfoContext';
import SidebarContext from '../../../../contexts/SidebarContext';
import CreateOrEditProject from '../CreateOrEditProject';
import { IUser } from '../../../../interfaces/IUser';
import ProjectStatus from '../../../../enums/ProjectStatus';
import { IProjectTaskCountStats } from '../../../../interfaces/IProjectTaskCountStats';
import { getTaskCount } from '../../../../services/project/stats';
import Skeleton from 'react-loading-skeleton';
import TaskStatus from '../../../../enums/TaskStatus';

export interface IProjectItemProps {
  project: IProject;
}

const ProjectItem: React.FunctionComponent<IProjectItemProps> = props => {
  const sidebarContext = useContext(SidebarContext);
  const userInfoContext = useContext(UserInfoContext);

  const [taskCount, setTaskCount] = useState<IProjectTaskCountStats>();
  const [taskCountStatusTotals, setTaskCountStatusTotals] = useState<number>();

  const handleProjectEditClick = () => {
    sidebarContext.removeSidebarComponent();
    sidebarContext.setSidebarComponent(
      <CreateOrEditProject
        projectId={props.project._id}
        onSuccess={onProjectCreateOrEdit}
      />
    );
  };

  const onProjectCreateOrEdit = () => {
    sidebarContext.removeSidebarComponent();
  };

  useEffect(() => {
    getTaskCount(props.project._id)
      .then(res => {
        setTaskCountStatusTotals(
          res.perTaskStatus.reduce((a, b) => a + (b['count'] || 0), 0)
        );
        setTaskCount(res);
      })
      .catch(console.error);
  }, [props.project]);

  return (
    <div className="project-item mb-2">
      <Card>
        <Card.Body className="project-card">
          <Row className="ml-1">
            <Col md={6}>
              <Row className="project-name">
                {props.project.name}
                {props.project.status === ProjectStatus.Ended && (
                  <span className="ml-2">
                    <Badge variant="secondary">Encerrado</Badge>
                  </span>
                )}
              </Row>
              <Row className="project-description">
                {!props.project.description && (
                  <div>
                    <i className="text-muted">Sem descrição</i>
                  </div>
                )}
                {props.project.description && (
                  <div>
                    {props.project.description}
                  </div>
                )}
              </Row>
              <Row className="project-info text-muted">
                <small>
                  Criado em{' '}
                  {new Intl.DateTimeFormat('pt-BR', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  }).format(new Date(props.project.createdAt))}
                </small>
              </Row>
            </Col>
            <Col md={3}>
              <Row className="d-block w-100">
                {!taskCount && <Skeleton count={1} height={16} />}
                {taskCount && (
                  <ProgressBar>
                    {taskCount.perTaskStatus
                      .filter(e => e.status !== TaskStatus.NotStarted)
                      .map((value, index) => (
                        <ProgressBar
                          variant={
                            value.status === TaskStatus.NotStarted
                              ? 'warning'
                              : value.status === TaskStatus.Started
                                ? 'info'
                                : value.status === TaskStatus.Finished
                                  ? 'success'
                                  : undefined
                          }
                          now={value.count}
                          max={taskCountStatusTotals}
                          key={index}
                          title={
                            value.status === TaskStatus.NotStarted
                              ? 'Não iniciadas'
                              : value.status === TaskStatus.Started
                                ? 'Iniciadas'
                                : value.status === TaskStatus.Finished
                                  ? 'Finalizadas'
                                  : undefined
                          }
                        />
                      ))}
                  </ProgressBar>
                )}
              </Row>
              <Row className="d-block">
                <div>
                  {!taskCount && <Skeleton count={1} height={8} width={90} />}
                  {taskCount && (
                    <small>
                      {taskCount?.perTaskStatus.find(
                        e => e.status === TaskStatus.NotStarted
                      )?.count + ' não iniciadas'}
                    </small>
                  )}
                </div>
                <div>
                  {!taskCount && <Skeleton count={1} height={8} width={70} />}
                  {taskCount && (
                    <small>
                      {taskCount?.perTaskStatus.find(
                        e => e.status === TaskStatus.Started
                      )?.count + ' iniciadas'}
                    </small>
                  )}
                </div>
                <div>
                  {!taskCount && <Skeleton count={1} height={8} width={80} />}
                  {taskCount && (
                    <small>
                      {taskCount?.perTaskStatus.find(
                        e => e.status === TaskStatus.Finished
                      )?.count + ' finalizadas'}
                    </small>
                  )}
                </div>
              </Row>
            </Col>
            <Col md={3}>
              <Link to={`/projects/${props.project._id}`}>
                <Button
                  variant="primary"
                  className="h-100 float-right ml-1"
                  title="Ver o projeto"
                >
                  <FontAwesomeIcon icon={faEye} />
                </Button>
              </Link>
              {(props.project.manager as IUser)._id ===
                userInfoContext.user?._id && (
                  <Button
                    variant="outline-primary"
                    className="h-100 float-right"
                    title="Editar o projeto"
                    onClick={handleProjectEditClick}
                    disabled={props.project.status === ProjectStatus.Ended}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProjectItem;
