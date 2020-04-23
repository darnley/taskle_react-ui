import React from 'react';
import IProject from '../../../../interfaces/IProject';
import { Card, Col, Row, Button } from 'react-bootstrap';
import './styles.scss';
import { Link } from 'react-router-dom';

export interface IProjectItemProps {
  project: IProject;
}

const ProjectItem: React.FunctionComponent<IProjectItemProps> = props => {
  return (
    <div className="project-item">
      <Card>
        <Card.Body>
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
            <Row>
              <Link to={`/projects/${props.project._id}`}>Ver</Link>
            </Row>
          </Col>
          <Col md={6}></Col>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProjectItem;
