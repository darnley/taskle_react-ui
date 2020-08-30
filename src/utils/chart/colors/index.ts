import TaskComplexity from "../../../enums/TaskComplexity";
import Task from "../../../components/projects/ProjectTasks/Task";
import TaskStatus from "../../../enums/TaskStatus";

export function getColorTaskComplexity(complexity: TaskComplexity) {
  switch (complexity) {
    case TaskComplexity.Low:
      return '#E1F3EE'
    case TaskComplexity.Medium:
      return '#A6E0D0'
    case TaskComplexity.High:
      return '#68CCB0'
  }
}

export function getColorTaskStatus(status: TaskStatus) {
  switch (status) {
    case TaskStatus.NotStarted:
      return '#E1F3EE'
    case TaskStatus.Started:
      return '#A6E0D0'
    case TaskStatus.Finished:
      return '#68CCB0'
  }
}