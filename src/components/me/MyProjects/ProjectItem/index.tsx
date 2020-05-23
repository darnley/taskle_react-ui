import React from 'react';
import IProject from '../../../../interfaces/IProject';
import { Card, Col, Row, Button } from 'react-bootstrap';
import './styles.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEye } from '@fortawesome/free-solid-svg-icons';

export interface IProjectItemProps {
  project: IProject;
}

const ProjectItem: React.FunctionComponent<IProjectItemProps> = props => {
  return (
    <div className="project-item">
      <Card>
        <Card.Body className="project-card">
          <Row className="ml-1">
            <Col md={6}>
              <Row className="project-description">
                {props.project.description}
              </Row>
              <Row>
                Iniciado em{' '}
                {new Intl.DateTimeFormat('pt-BR', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }).format(new Date(props.project.createdAt))}
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
              <Button
                variant="outline-primary"
                className="h-100 float-right"
                title="Editar o projeto"
              >
                <FontAwesomeIcon icon={faPen} />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProjectItem;
