// @flow
import { TaskState } from './enums';

export const noop = {};

export const TaskStateTitles = {
  [TaskState.draft]: 'draft',
  [TaskState.completed]: 'completed',
  [TaskState.inprogress]: 'in progress',
};
