// @flow

export const noop = {};

export const TaskStatus = {
  draft: 'draft',
  completed: 'completed',
  inprogress: 'in-progress',
  pending: 'pending',
  scheduled: 'scheduled',
};

export const EndType = {
  Date: 'Date',
  ResultCount: 'ResultCount',
  ExceedTasks: 'ExceedTasks',
};
