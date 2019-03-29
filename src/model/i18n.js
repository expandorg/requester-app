// @flow
import { EndType, TaskStatus } from './enums';

export const TaskStatusTitles = {
  [TaskStatus.draft]: 'draft',
  [TaskStatus.completed]: 'completed',
  [TaskStatus.inprogress]: 'in progress',
  [TaskStatus.pending]: 'pending',
  [TaskStatus.inprogress]: 'in progress',
  [TaskStatus.scheduled]: 'scheduled',
};

export const EndWhenTitles = {
  [EndType.ExceedTasks]: 'Exceeded all tasks',
  [EndType.ResultCount]: 'On Specific result count',
  [EndType.Date]: 'On specific date',
};
