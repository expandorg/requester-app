// @flow

import type { Form } from '@expandorg/modules/src/form/model/types.flow';

export type DraftOnboardingGroupData = {
  answer: {
    field: string,
  },
  columns: Array<{
    name: string,
    type: 'text' | 'number' | 'bool',
  }>,
  steps: Array<{
    values: Array<Array<string>>,
    answer: ?string,
  }>,
};

export type DraftOnboardingStep = {
  id: string,
  name: string,
  form: Form,
  isGroup: boolean,
  scoreThreshold: number,
  retries: number,
  failureMessage: string,
  data?: DraftOnboardingGroupData,
};

export type Draft = {
  id?: string,

  requesterId?: number,
  jobId?: number,

  name: string,
  description: string,

  variables?: Array<string>,

  status: 'draft' | 'completed' | 'inprogress' | 'pending' | 'scheduled',

  dataId?: string,
  templateId?: string,

  taskForm: Form,
  verificationForm?: Form,

  onboarding: {
    enabled: boolean,
    steps: Array<DraftOnboardingStep>,
  },
  eligibility: {
    module: string,
  },
  assignment?: {
    module: string,
    limit: number,
    repeat: boolean,
    expiration: number,
  },
  verification: {
    module: string,
    agreementCount: number,
    scoreThreshold: number,
  },
  funding: {
    module: string,
    requirement: number,
    balance: number,
    reward: number,
    verificationReward: number,
  },
  whitelist?: Array<any>,
  callbackUrl?: string,
};

export type DraftOnboardingGroupTemplate = {
  id: string,
  name: string,
  isGroup: boolean,
  scoreThreshold: number,
  retries: number,
  failureMessage: string,
  taskForm: Form,
  data?: DraftOnboardingGroupData,
};
