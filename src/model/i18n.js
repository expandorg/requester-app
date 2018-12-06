// @flow
import { TaskState } from './enums';
import { EndType } from './draft';

export const noop = {};

export const TaskStateTitles = {
  [TaskState.draft]: 'draft',
  [TaskState.completed]: 'completed',
  [TaskState.inprogress]: 'in progress',
  [TaskState.pending]: 'pending',
  [TaskState.inprogress]: 'in progress',
  [TaskState.scheduled]: 'scheduled',
};

export const EndWhenTitles = {
  [EndType.ExceedTasks]: 'Exceeded all tasks',
  [EndType.ResultCount]: 'On Specific result count',
  [EndType.Date]: 'On specific date',
};
