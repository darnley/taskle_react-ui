import React, { useState, useEffect } from 'react';
import {
  IProjectTaskCountStats,
  IPerKeyword,
  IPerTaskStatus,
  IPerTaskComplexity,
} from '../../../interfaces/IProjectTaskCountStats';
import { getTaskCount } from '../../../services/project/stats';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Treemap } from 'recharts';
import { Container, Col, Card, Row } from 'react-bootstrap';
import { getColorTaskComplexity, getColorTaskStatus } from '../../../utils/chart/colors';
import TaskComplexity from '../../../enums/TaskComplexity';
import TaskStatus from '../../../enums/TaskStatus';
import { getLabelTaskComplexity, getLabelTaskStatus } from '../../../utils/chart/labels';

export interface IProjectStatsProps { }

const ProjectStats: React.FunctionComponent<IProjectStatsProps> = props => {
  const { projectId } = useParams();
  const [statsPerKeywords, setStatsPerKeywords] = useState<IPerKeyword[]>([]);
  const [statsPerStatus, setStatsPerStatus] = useState<IPerTaskStatus[]>([]);
  const [statsPerComplexity, setStatsPerComplexity] = useState<
    IPerTaskComplexity[]
  >([]);

  const getStats = (projectId: string) => {
    getTaskCount(projectId)
      .then(res => {
        setStatsPerKeywords(res.perKeywords.map(entry => {
          entry.name = entry.keyword;
          return entry;
        }));
        setStatsPerStatus(res.perTaskStatus);
        setStatsPerComplexity(res.perTaskComplexity);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getStats(projectId!);
  }, [projectId]);

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Row>
            <Card className="h-100 w-100">
              <Card.Header>
                Por <i>status</i> da tarefa
              </Card.Header>
              <Card.Body>
                <ResponsiveContainer height={200} width="100%">
                  <PieChart>
                    <Pie
                      dataKey="count"
                      nameKey="status"
                      animationDuration={500}
                      data={statsPerStatus!}
                      outerRadius={80}
                      label={entry => getLabelTaskStatus(entry.name as TaskStatus)}
                    >
                      {
                        statsPerStatus.map((entry, index) => <Cell fill={getColorTaskStatus(entry.status as TaskStatus)} />)
                      }
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

              </Card.Body>
            </Card>
          </Row>
          <Row className="mt-2">
            <Card className="h-100 w-100">
              <Card.Header>Por complexidade</Card.Header>
              <Card.Body>
                <ResponsiveContainer height={260}>
                  <PieChart>
                    <Pie
                      dataKey="count"
                      nameKey="complexity"
                      animationDuration={500}
                      data={statsPerComplexity}
                      outerRadius={80}
                      label={entry => getLabelTaskComplexity(entry.name as TaskComplexity)}
                    >
                      {
                        statsPerComplexity.map((entry, index) => <Cell fill={getColorTaskComplexity(entry.complexity as TaskComplexity)} />)
                      }
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Row>
        </Col>
        <Col md={6}>
          <Card className="h-100 w-100">
            <Card.Header>Por palavras-chave</Card.Header>
            <Card.Body>
              <ResponsiveContainer>
                <Treemap data={statsPerKeywords} dataKey="count" stroke="#fff" animationDuration={500} />
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectStats;
