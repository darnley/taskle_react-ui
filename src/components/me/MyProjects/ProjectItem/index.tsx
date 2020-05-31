import React, { useContext } from 'react';
import IProject from '../../../../interfaces/IProject';
import { Card, Col, Row, Button } from 'react-bootstrap';
import './styles.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import UserInfoContext from '../../../../contexts/UserInfoContext';
import SidebarContext from '../../../../contexts/SidebarContext';
import CreateOrEditProject from '../CreateOrEditProject';
import { IUser } from '../../../../interfaces/IUser';
import ProjectStatus from '../../../../enums/ProjectStatus';

export interface IProjectItemProps {
  project: IProject;
}

const ProjectItem: React.FunctionComponent<IProjectItemProps> = props => {
  const sidebarContext = useContext(SidebarContext);
  const userInfoContext = useContext(UserInfoContext);

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

  return (
    <div className="project-item mb-2">
      <Card>
        <Card.Body className="project-card">
          <Row className="ml-1">
            <Col md={6}>
              <Row className="project-name">{props.project.name}</Row>
              <Row className="project-description">
                {props.project.description}
                {!props.project.description && (
                  <i className="text-muted">Sem descrição</i>
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
            <Col md={6}>
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
