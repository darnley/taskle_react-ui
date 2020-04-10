import React from 'react';
import IProject from '../../../../interfaces/IProject';
import { Card, Col, Row } from 'react-bootstrap';
import './styles.scss';

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
          </Col>
          <Col md={8}></Col>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProjectItem;
