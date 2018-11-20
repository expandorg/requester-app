// @flow
import { rules } from '@gemsorg/validation';

export const settingsRules = {
  logo: [[rules.isRequired, 'Logo is required']],
  title: [[rules.isRequired, 'Title is required']],
  description: [[rules.isRequired, 'Description is required']],
  startDate: [[rules.isRequired, 'Start date is required']],
  endDate: [[rules.isRequired, 'End date is required']],
};

export const fundingRules = {};
