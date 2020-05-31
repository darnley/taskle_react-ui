import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import IProject from '../../../../interfaces/IProject';
import {
  getProject,
  getPeople,
  endProject,
} from '../../../../services/project';
import { Button, Form, ListGroup, Alert } from 'react-bootstrap';
import { IUser } from '../../../../interfaces/IUser';
import { getAllTasks } from '../../../../services/project/task';
import { ITask } from '../../../../interfaces/ITask';
import TaskStatus from '../../../../enums/TaskStatus';
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rate from 'rc-rate';

import './styles.scss';
import IProjectEndRating from '../../../../interfaces/IProjectEndRating';
import Rating from '../../../shared/Rating';
import { useToasts } from 'react-toast-notifications';
import SidebarContext from '../../../../contexts/SidebarContext';

export interface IFinishProjectProps {
  projectId: string;
}

const FinishProject: React.FunctionComponent<IFinishProjectProps> = props => {
  const [project, setProject] = useState<IProject>();
  const [people, setPeople] = useState<IUser[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [projectEndRatings, setProjectEndRatings] = useState<
    IProjectEndRating[]
  >([]);
  const { addToast } = useToasts();
  const sidebarContext = useContext(SidebarContext);

  useEffect(() => {
    getProject(props.projectId)
      .then(setProject)
      .catch(console.error);

    getPeople(props.projectId).then(setPeople);

    getAllTasks(props.projectId).then(setTasks);
  }, [props.projectId]);

  const onStarChoose = (userId: string, starRating: number) => {
    let currentIndex = projectEndRatings.findIndex(per => per.user === userId);

    // If user hasn't choose the star rating for this user
    if (currentIndex === -1) {
      setProjectEndRatings([
        ...projectEndRatings,
        {
          user: userId,
          starRating: starRating,
        },
      ]);
    } else {
      setProjectEndRatings([
        ...projectEndRatings.splice(currentIndex),
        {
          user: userId,
          starRating: starRating,
        },
      ]);
    }
  };

  const onSubmit = () => {
    endProject(props.projectId, projectEndRatings).then(() => {
      addToast('O projeto foi encerrado com sucesso.', {
        appearance: 'success',
      });

      sidebarContext.removeSidebarComponent();
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <fieldset>
        <p>
          {tasks.findIndex(t => t.status !== TaskStatus.Finished) !== -1 && (
            <Alert variant="warning">
              <strong>Fique atento!</strong>
              <p className="mb-0">
                Existe(m){' '}
                {tasks
                  .filter(t => t.status !== TaskStatus.Finished)
                  .reduce(taskCount => taskCount + 1, 0)}{' '}
                tarefa(s) no projeto que não foram finalizadas.
              </p>
            </Alert>
          )}
        </p>
        <p className="text-muted">
          Dê estrelas para os que trabalharam bem no projeto.
        </p>
        <p>
          <ListGroup>
            {people.length > 0 &&
              people.map(person => (
                <ListGroup.Item>
                  <div className="user-project-rating-grid-container">
                    <div className="user-project-rating-info">
                      {person.firstName + ' ' + person.lastName}
                      <br />
                      <small className="text-muted">
                        Participou de{' '}
                        {
                          tasks.filter(t => t.responsible?._id === person._id)
                            .length
                        }{' '}
                        tarefa(s)
                      </small>
                    </div>
                    <div className="user-project-rating-stars">
                      <Rating
                        emptyColor="grey"
                        fullColor="orange"
                        hoverColor="#ffd78e"
                        outOf={4}
                        stars={0}
                        renderComponent={<FontAwesomeIcon icon={faStar} />}
                        onChange={stars => onStarChoose(person._id, stars)}
                      />
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </p>
      </fieldset>
      <Button type="submit" variant="primary" block>
        Enviar
      </Button>
    </Form>
  );
};

export default FinishProject;
