import React, { useState, useEffect } from 'react';
import { IUser } from '../../../../interfaces/IUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShare, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import IPersonStats from '../../../../interfaces/IPersonStats';
import { getStatTaskComplexity, getProjects } from '../../../../services/people';
import IProject from '../../../../interfaces/IProject';
import { Treemap, ResponsiveContainer, PieChart, Pie, Label } from 'recharts';

export interface ISeePerson {
  person: IUser;
}

const SeePerson: React.FunctionComponent<ISeePerson> = (props) => {
  const [personStatsTaskComplexity, setPersonStatsTaskComplexity] = useState<IPersonStats[]>([]);
  const [personProjects, setPersonProjects] = useState<IProject[]>([]);

  useEffect(() => {
    if (props.person?._id) {
      getStatTaskComplexity(props.person._id)
        .then(setPersonStatsTaskComplexity)
        .catch(console.error)

      getProjects(props.person._id)
        .then(setPersonProjects)
        .catch(console.error)
    }
  }, [])

  return (
    <>
      <section id="see-person-bio" className="text-center">
        <h3>
          {props.person.starRatingCount} <span className="text-warning"><FontAwesomeIcon icon={faStar} /></span>
        </h3>
        <div className="font-weight-bold">{props.person.firstName} {props.person.lastName}</div>
        <div>
          <small>{props.person.position ?? <i className="text-muted">Sem cargo</i>}</small>
        </div>
        <div>
          <small>Entrou em
            <strong className="ml-1">
              {
                new Intl.DateTimeFormat('pt-BR', {
                  year: 'numeric',
                }).format(new Date(props.person.createdAt))
              }
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
                <Pie data={personStatsTaskComplexity} dataKey="count" innerRadius={63} outerRadius={90} fill="#82ca9d" label={(entry) => entry.name}>
                  <Label value={`${personStatsTaskComplexity.reduce((pv, cv) => pv + cv.count, 0)} tarefas concluídas`} position="center" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </span>
        </div>
        <hr />
        <div>
          <span>Palavras-chaves mais concluídas</span>
          <span>
            <ResponsiveContainer height={400} width="100%">
              <Treemap data={props.person.keywords} nameKey="name" dataKey="count" stroke="#fff" fill="#82c3ea" animationDuration={500} />
            </ResponsiveContainer>
          </span>
        </div>
      </section>
    </>
  )
};

export default SeePerson;