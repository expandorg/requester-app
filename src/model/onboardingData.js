// @flow

import immer from 'immer';

import { type DraftOnboardingGroupData } from './types.flow';

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

const convertType = (val: string, type: string): string => {
  switch (type) {
    case 'text': {
      // $FlowFixMe
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
