// @flow

export const DraftStatus = {
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

export const VerificationType = {
  Noop: 'noop',
  Requester: 'requester',
  Consensus: 'consensus',
  Audit: 'audit',
  AuditWhitelist: 'audit-whitelist',
};
