import React from 'react';
import lowComplexitySvg from './svg/task-complexity-low.svg';
import mediumComplexitySvg from './svg/task-complexity-medium.svg';
import highComplexitySvg from './svg/task-complexity-high.svg';
import TaskComplexity from '../../../enums/TaskComplexity';

export interface ITaskComplexityIconProps {
  complexity: TaskComplexity;
  width?: string;
  height?: string;
}

const TaskComplexityIcon: React.FunctionComponent<ITaskComplexityIconProps> = props => {
  const getCurrentTaskComplexityIcon = (
    taskComplexity: TaskComplexity,
    width: string | undefined,
    height: string | undefined
  ) => {
    const innerWidth = width ?? 'auto';
    const innerHeight = height ?? 'auto';

    if (taskComplexity === TaskComplexity.Low) {
      return (
        <img
          src={lowComplexitySvg}
          alt="Tarefa de baixa complexidade"
          title="Tarefa de baixa complexidade"
          width={innerWidth}
          height={innerHeight}
        />
      );
    } else if (taskComplexity === TaskComplexity.Medium) {
      return (
        <img
          src={mediumComplexitySvg}
          alt="Tarefa de média complexidade"
          title="Tarefa de média complexidade"
          width={innerWidth}
          height={innerHeight}
        />
      );
    } else if (taskComplexity === TaskComplexity.High) {
      return (
        <img
          src={highComplexitySvg}
          alt="Tarefa de alta complexidade"
          title="Tarefa de alta complexidade"
          width={innerWidth}
          height={innerHeight}
        />
      );
    }
  };

  return (
    <>
      {getCurrentTaskComplexityIcon(
        props.complexity,
        props.width,
        props.height
      )}
    </>
  );
};

export default TaskComplexityIcon;
