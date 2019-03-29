// @flow
import format from 'date-fns/format';
import nanoid from 'nanoid';

import { rules } from '@expandorg/validation';
import { VerificationType } from './enums';

export const settingsRules = {
  name: [
    [rules.isRequired, 'Title is required'],
    [
      (x: string) => x && x.length <= 40,
      'Title can be a maximum of 40 characters',
    ],
  ],
  description: [[rules.isRequired, 'Description is required']],
};

const ge = (g: number = 0) => [
  (v: number) => v >= g,
  `Should be greater then ${g}`,
];

export const fundingRules = {
  balance: [[rules.isNumber, 'Should be a positive number'], ge(0)],
  reward: [[rules.isNumber, 'Should be a positive number'], ge(0)],
};

export const onboardingGroupSettingsRules = {
  retries: [[rules.isNumber, 'Should be a positive number'], ge(0)],
  scoreThreshold: [[rules.isNumber, 'Should be a positive number'], ge(0)],
  failureMessage: [[rules.isRequired, 'Failure Message is required']],
};

export const formatDate = (date: ?Object | ?number) =>
  date ? format(date, 'MM/DD/YYYY HH:mm') : '--/--/--';

export const createDashboardEntity = (draft: Object) => ({
  id: draft.id,
  name: draft.name,
  logo: draft.logo,
  status: draft.status || 'draft',
});

export const shouldUseVerificationForm = ({ verification }: Object) =>
  verification.module === VerificationType.Requester ||
  verification.module === VerificationType.AuditWhitelist;

export const getOnboardingStepFromTemplate = ({
  name,
  taskForm,
  isGroup,
  scoreThreshold,
  retries,
  failureMessage,
  data,
}: Object) => ({
  id: nanoid(),
  name,
  isGroup,
  scoreThreshold,
  retries,
  failureMessage,
  data,
  form: taskForm,
});
