import React, { useState, useEffect } from 'react';
import {
  IProjectTaskCountStats,
  IPerKeyword,
  IPerTaskStatus,
  IPerTaskComplexity,
} from '../../../interfaces/IProjectTaskCountStats';
import { getTaskCount } from '../../../services/project/stats';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Container, Col, Card, Row } from 'react-bootstrap';

export interface IProjectStatsProps {}

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
        setStatsPerKeywords(
          res.perKeywords.map(e => {
            let f: any = e;
            f.name = e.keyword;
            return e;
          })
        );

        setStatsPerStatus(
          res.perTaskStatus.map(e => {
            let f: any = e;
            f.name = e.status;
            return e;
          })
        );

        setStatsPerComplexity(
          res.perTaskComplexity.map(e => {
            let f: any = e;
            f.name = e.complexity;
            return e;
          })
        );
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
                <PieChart width={260} height={260}>
                  <Pie
                    dataKey="count"
                    isAnimationActive={false}
                    data={statsPerStatus!}
                    cx={130}
                    cy={130}
                    outerRadius={80}
                    label={entry => entry.name}
                  />
                  <Tooltip />
                </PieChart>
              </Card.Body>
            </Card>
          </Row>
          <Row className="mt-2">
            <Card className="h-100 w-100">
              <Card.Header>Por complexidade</Card.Header>
              <Card.Body>
                <PieChart width={260} height={260}>
                  <Pie
                    dataKey="count"
                    isAnimationActive={false}
                    data={statsPerComplexity}
                    cx={130}
                    cy={130}
                    outerRadius={80}
                    label={entry => entry.name}
                  />
                  <Tooltip />
                </PieChart>
              </Card.Body>
            </Card>
          </Row>
        </Col>
        <Col md={6}>
          <Card className="h-100 w-100">
            <Card.Header>Por palavras-chave</Card.Header>
            <Card.Body>asdasd</Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectStats;
