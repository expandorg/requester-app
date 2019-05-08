// @flow

import immer from 'immer';

import { getFormModules } from '@expandorg/modules/model';
import type { Form } from '@expandorg/modules/src/form/model/types.flow';

import type { DraftOnboardingGroupData } from './types.flow';

export const columnTypes = ['text', 'number', 'bool'];

export const dataToVars = ({
  answer,
  columns,
  steps,
}: DraftOnboardingGroupData): Array<{
  answer: { [filed: string]: string },
  variables: { [key: string]: any },
}> =>
  steps.map(row => {
    const variables = columns.reduce((set, col, index) => {
      set[col.name] = row.values[index];
      return set;
    }, {});
    return { variables, answer: { [answer.field]: row.answer } };
  });

export const createNewRow = (columns: Array<any>): Array<string> =>
  columns.map(() => '');

export const createNewColumn = (num: string, type: string = 'text') => ({
  name: `var${num}`,
  type,
});

const convertType = (val: string, type: string): string => {
  switch (type) {
    case 'text': {
      return val;
    }
    case 'number': {
      const num = +val;
      return Number.isNaN(num) ? '0' : val;
    }
    case 'bool': {
      return val;
    }
    default:
      break;
  }
  return val;
};

export const updateValuesType = (
  steps: Array<{ values: Array<string>, answer: string }>,
  col: number,
  type: string
) =>
  immer(steps, draft => {
    for (let i = 0; i < steps.length; i += 1) {
      draft[i].values[col] = convertType(draft[i].values[col], type);
    }
  });

export const removeValuesColumns = (
  steps: Array<{ values: Array<string>, answer: string }>,
  col: number
) =>
  immer(steps, draft => {
    for (let i = 0; i < steps.length; i += 1) {
      draft[i].values.splice(col, 1);
    }
  });

export const insertValuesColumn = (
  steps: Array<{ values: Array<string>, answer: string }>
) =>
  immer(steps, draft => {
    for (let i = 0; i < steps.length; i += 1) {
      draft[i].values.push('');
    }
  });

const answersFields = new Set([
  'checkbox',
  'dropdown',
  'input',
  'select',
  'yesno',
]);

export const gerAnswerFields = (form: Form) => {
  const valid = getFormModules(form).filter(m => answersFields.has(m.type));
  return [...new Set(valid.map(m => m.name))];
};
