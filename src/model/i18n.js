// @flow
import format from 'date-fns/format';
import { EndType, DraftStatus } from './enums';

export const DraftStatusTitles = {
  [DraftStatus.draft]: 'draft',
  [DraftStatus.completed]: 'completed',
  [DraftStatus.inprogress]: 'in progress',
  [DraftStatus.pending]: 'pending',
  [DraftStatus.inprogress]: 'in progress',
  [DraftStatus.scheduled]: 'scheduled',
};

export const EndWhenTitles = {
  [EndType.ExceedTasks]: 'Exceeded all tasks',
  [EndType.ResultCount]: 'On Specific result count',
  [EndType.Date]: 'On specific date',
};

export const formatDate = (date: ?any | ?number) =>
  date ? format(date, 'MM/DD/YYYY HH:mm') : '--/--/--';
