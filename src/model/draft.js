// @flow
import format from 'date-fns/format';
import nanoid from 'nanoid';

import { rules } from '@gemsorg/validation';

export const settingsRules = {
  // logo: [[rules.isRequired, 'Logo is required']],
  title: [[rules.isRequired, 'Title is required']],
  description: [[rules.isRequired, 'Description is required']],
};

const ge = (g: number = 0) => [
  (v: number) => v >= g,
  `Should be greater then ${g}`,
];

export const fundingRules = {
  requirement: [[rules.isNumber, 'Should be a positive number'], ge(0)],
  reward: [[rules.isNumber, 'Should be a positive number'], ge(0)],
};

export const formatDate = (date: ?Object | ?number) =>
  date ? format(date, 'MM/DD/YYYY HH:mm') : '--/--/--';

export const getStepFromTemplate = ({ name, taskForm }: Object) => ({
  id: nanoid(),
  name,
  form: taskForm,
});

export const createDashboardEntity = (draft: Object) => ({
  id: draft.id,
  title: draft.title,
  logo: draft.logo,
  status: draft.status || 'draft',
});
