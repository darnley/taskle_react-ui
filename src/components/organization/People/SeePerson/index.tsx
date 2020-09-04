import React, { useState, useEffect, useContext } from 'react';
import { IUser } from '../../../../interfaces/IUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShare, faShareAlt, faSearch, faPen } from '@fortawesome/free-solid-svg-icons';
import IPersonStats from '../../../../interfaces/IPersonStats';
import {
  getStatTaskComplexity,
  getProjects,
} from '../../../../services/people';
import IProject from '../../../../interfaces/IProject';
import {
  Treemap,
  ResponsiveContainer,
  PieChart,
  Pie,
  Label,
  TooltipProps,
  Tooltip,
  Cell,
} from 'recharts';
import { getLabelTaskComplexity } from '../../../../utils/chart/labels';
import TaskComplexity from '../../../../enums/TaskComplexity';
import { getColorTaskComplexity } from '../../../../utils/chart/colors';
import { Alert, Button } from 'react-bootstrap';
import SidebarContext from '../../../../contexts/SidebarContext';
import AddPerson from '../AddPerson';

export interface ISeePerson {
  person: IUser;
}

const SeePerson: React.FunctionComponent<ISeePerson> = props => {
  const [personStatsTaskComplexity, setPersonStatsTaskComplexity] = useState<
    IPersonStats[]
  >([]);
  const [personProjects, setPersonProjects] = useState<IProject[]>([]);
  const sidebarContext = useContext(SidebarContext);

  useEffect(() => {
    if (props.person?._id) {
      getStatTaskComplexity(props.person._id)
        .then(setPersonStatsTaskComplexity)
        .catch(console.error);

      getProjects(props.person._id)
        .then(setPersonProjects)
        .catch(console.error);
    }
  }, [props.person, props.person._id]);

  const handlePersonEditButtonClick = (personId: string) => {
    const handlePersonEditCallback = () => {
      sidebarContext.removeSidebarComponent();
      window.location.reload(false);
    };

    sidebarContext.setSidebarComponent(
      <AddPerson personId={personId} onPersonAdded={handlePersonEditCallback} />
    );
  };

  const CustomTooltipTasksByComplexity = (data: TooltipProps) => {
    if (data.active) {
      const complexityLabel: string = getLabelTaskComplexity(
        data!.payload![0].name as TaskComplexity
      );

      return (
        <div className="bg-light p-2 border">
          <p className="label font-weight-bold">
            {complexityLabel} complexidade
          </p>
          <p className="intro">{data!.payload![0].value} tarefa(s)</p>
        </div>
      );
    }

    return null;
  };

  const CustomTooltipTreeMapKeywords = (data: TooltipProps) => {
    if (data.active) {
      console.log(data!.payload![0]);
      return (
        <div className="bg-light p-2 border">
          <p className="label font-weight-bold">{data!.payload![0].name}</p>
          <p className="intro">{data!.payload![0].value} tarefa(s)</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <section id="see-person-bio" className="text-center">
        <small style={{ position: 'absolute', right: 0 }}>
          <Button variant="light" type="button" size="sm">
            <FontAwesomeIcon
              icon={faPen}
              title="Editar a pessoa"
              onClick={() => handlePersonEditButtonClick(props.person._id)}
            />
          </Button>
        </small>
        <h3>
          {props.person.starRatingCount}{' '}
          <span className="text-warning">
            <FontAwesomeIcon icon={faStar} />
          </span>
        </h3>
        <div className="font-weight-bold">
          {props.person.firstName} {props.person.lastName}
        </div>
        <div>
          <small>
            {props.person.position ?? <i className="text-muted">Sem cargo</i>}
          </small>
        </div>
        <div>
          <small>
            Entrou em
            <strong className="ml-1">
              {new Intl.DateTimeFormat('pt-BR', {
                year: 'numeric',
              }).format(new Date(props.person.createdAt))}
            </strong>
          </small>
        </div>
        <div>
          <small>
            Faz parte da equipe <strong>{props.person.team.name}</strong>
          </small>
        </div>
      </section>
      <hr />
      <section className="text-center">
        <div>
          <small>
            <FontAwesomeIcon icon={faShareAlt} className="mr-1" />
            Participou de {personProjects.length} projeto(s)
          </small>
        </div>
        <div>
          <span>
            <ResponsiveContainer height={200}>
              <PieChart>
                <Pie
                  dataKey="count"
                  nameKey="name"
                  animationDuration={500}
                  data={personStatsTaskComplexity}
                  innerRadius={70}
                  outerRadius={90}
                >
                  {personStatsTaskComplexity.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={getColorTaskComplexity(
                        entry.name as TaskComplexity
                      )}
                    />
                  ))}
                  <Label
                    value={`${personStatsTaskComplexity.reduce(
                      (pv, cv) => pv + cv.count,
                      0
                    )} tarefas concluídas`}
                    position="center"
                  />
                </Pie>
                <Tooltip content={<CustomTooltipTasksByComplexity />} />
              </PieChart>
            </ResponsiveContainer>
          </span>
        </div>
        <hr />
        <div>
          <span>Palavras-chaves mais concluídas</span>
          {props.person.keywords && props.person.keywords.length > 0 && (
            <span>
              <ResponsiveContainer height={400} width="100%">
                <Treemap
                  data={props.person.keywords}
                  nameKey="name"
                  dataKey="count"
                  stroke="#fff"
                  fill="#82c3ea"
                  animationDuration={500}
                >
                  <Tooltip content={<CustomTooltipTreeMapKeywords />} />
                </Treemap>
              </ResponsiveContainer>
            </span>
          )}
          {(!props.person.keywords || props.person.keywords.length === 0) && (
            <Alert variant="light">
              <FontAwesomeIcon icon={faSearch} className="mr-1" />
              Não há dados suficientes
            </Alert>
          )}
        </div>
      </section>
    </>
  );
};

export default SeePerson;
