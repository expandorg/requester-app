// @flow
import format from 'date-fns/format';

import { rules } from '@gemsorg/validation';

export const settingsRules = {
  logo: [[rules.isRequired, 'Logo is required']],
  title: [[rules.isRequired, 'Title is required']],
  description: [[rules.isRequired, 'Description is required']],
  startDate: [[rules.isRequired, 'Start date is required']],
};

const ge = (g: number = 0) => [
  (v: number) => v >= g,
  `Should be greater then ${g}`,
];

export const fundingRules = {
  pay: [[rules.isNumber, 'Should be a positive number'], ge(0)],
  earned: [[rules.isNumber, 'Should be a positive number'], ge(0)],
};

export const formatDate = (date: ?Object | ?number) =>
  date ? format(date, 'MM/DD/YYYY HH:mm') : '--/--/--';
