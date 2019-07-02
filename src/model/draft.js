// @flow

import { rules } from '@expandorg/validation';
import { ge } from './validation';

export const settingsRules = {
  name: [
    [rules.isRequired, 'Title is required'],
    [
      (x: string) => x && x.length <= 40,
      'Title can be a maximum of 40 characters',
    ],
  ],
  // description: [[rules.isRequired, 'Description is required']],
};

export const onboardingGroupSettingsRules = {
  retries: [[rules.isNumber, 'Should be a positive number'], ge(0)],
  scoreThreshold: [[rules.isNumber, 'Should be a positive number'], ge(0)],
  failureMessage: [[rules.isRequired, 'Failure Message is required']],
};
