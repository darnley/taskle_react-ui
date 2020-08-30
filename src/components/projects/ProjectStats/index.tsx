import React, { useState, useEffect } from 'react';
import {
  IProjectTaskCountStats,
  IPerKeyword,
  IPerTaskStatus,
  IPerTaskComplexity,
} from '../../../interfaces/IProjectTaskCountStats';
import { getTaskCount } from '../../../services/project/stats';
import { useParams } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Treemap,
  TooltipPayload,
  TooltipProps,
} from 'recharts';
import { Container, Col, Card, Row } from 'react-bootstrap';
import {
  getColorTaskComplexity,
  getColorTaskStatus,
} from '../../../utils/chart/colors';
import TaskComplexity from '../../../enums/TaskComplexity';
import TaskStatus from '../../../enums/TaskStatus';
import {
  getLabelTaskComplexity,
  getLabelTaskStatus,
} from '../../../utils/chart/labels';

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
        setStatsPerKeywords(
          res.perKeywords.map(entry => {
            entry.name = entry.keyword;
            return entry;
          })
        );
        setStatsPerStatus(res.perTaskStatus);
        setStatsPerComplexity(res.perTaskComplexity);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getStats(projectId!);
  }, [projectId]);

  const CustomTooltipTasksByStatus = (data: TooltipProps) => {
    if (data.active) {
      const statusLabel: string = getLabelTaskStatus(
        data!.payload![0].name as TaskStatus
      );

      return (
        <div className="bg-light p-2 border">
          <p className="label font-weight-bold">{statusLabel}</p>
          <p className="intro">{data!.payload![0].value} tarefa(s)</p>
        </div>
      );
    }

    return null;
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
    <Container>
      <Row>
        <Col md={3}>
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
                      innerRadius={55}
                      outerRadius={80}
                    >
                      {statsPerStatus.map((entry, index) => (
                        <Cell
                          fill={getColorTaskStatus(entry.status as TaskStatus)}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltipTasksByStatus />} />
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
                      innerRadius={55}
                      outerRadius={80}
                    >
                      {statsPerComplexity.map((entry, index) => (
                        <Cell
                          fill={getColorTaskComplexity(
                            entry.complexity as TaskComplexity
                          )}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltipTasksByComplexity />} />
                  </PieChart>
                </ResponsiveContainer>
              </Card.Body>
            </Card>
          </Row>
        </Col>
        <Col md={8}>
          <Card className="h-100 w-100">
            <Card.Header>Por palavras-chave</Card.Header>
            <Card.Body>
              <ResponsiveContainer>
                <Treemap
                  data={statsPerKeywords}
                  dataKey="count"
                  nameKey="keyword"
                  stroke="#fff"
                  animationDuration={500}
                >
                  <Tooltip content={<CustomTooltipTreeMapKeywords />} />
                </Treemap>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectStats;
