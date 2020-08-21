import TaskComplexity from "../../../enums/TaskComplexity";
import TaskStatus from "../../../enums/TaskStatus";

export function getLabelTaskComplexity(complexity: TaskComplexity): string {
  switch (complexity) {
    case TaskComplexity.Low:
      return 'Baixa';
    case TaskComplexity.Medium:
      return 'Média';
    case TaskComplexity.High:
      return 'Alta';
  }
}

export function getLabelTaskStatus(status: TaskStatus) {
  switch (status) {
    case TaskStatus.NotStarted:
      return 'Não iniciada'
    case TaskStatus.Started:
      return 'Iniciada'
    case TaskStatus.Finished:
      return 'Finalizada'
  }
}