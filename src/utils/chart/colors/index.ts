import TaskComplexity from "../../../enums/TaskComplexity";
import Task from "../../../components/projects/ProjectTasks/Task";
import TaskStatus from "../../../enums/TaskStatus";

export function getColorTaskComplexity(complexity: TaskComplexity) {
  switch (complexity) {
    case TaskComplexity.Low:
      return '#f1f1f1'
    case TaskComplexity.Medium:
      return '#c1c1c1'
    case TaskComplexity.High:
      return 'cyan'
  }
}

export function getColorTaskStatus(status: TaskStatus) {
  switch (status) {
    case TaskStatus.NotStarted:
      return '#f1f1f1'
    case TaskStatus.Started:
      return '#c1c1c1'
    case TaskStatus.Finished:
      return 'cyan'
  }
}