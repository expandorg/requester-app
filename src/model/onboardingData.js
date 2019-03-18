// @flow

import immer from 'immer';

type ColumnType = 'text' | 'number' | 'bool';

export const columnTypes = ['text', 'number', 'bool'];

export type Column = {
  name: string,
  type: ColumnType,
};

export type ColumnValue = string | number | boolean | null;

export type OnboardingGroupData = {
  answer: {
    field: string,
  },
  columns: Array<Column>,
  steps: Array<{
    values: Array<Array<ColumnValue>>,
    answer: ?string,
  }>,
};

export const dataToVars = ({
  answer,
  columns,
  steps,
}: OnboardingGroupData): Array<{
  answer: ?{ [filed: string]: string },
  variables: Object,
}> =>
  steps.map(row => {
    const variables = columns.reduce((set, col, index) => {
      set[col.name] = row.values[index];
      return set;
    }, {});
    return { variables, answer: { [answer.field]: row.answer } };
  });

const getDefaultValue = (type: ColumnType): ColumnValue => {
  switch (type) {
    case 'text':
      return '';
    case 'number':
      return '';
    case 'bool':
      return false;
    default:
      break;
  }
  return '';
};

export const createNewRow = (columns: Array<Column>): Array<ColumnValue> =>
  columns.map(col => getDefaultValue(col.type));

const convertType = (val: ColumnValue, type: ColumnType): ColumnValue => {
  switch (type) {
    case 'text': {
      // $FlowFixMe
      return val.toString();
    }
    case 'number': {
      const num = +val;
      return Number.isNaN(num) ? 0 : num;
    }
    case 'bool': {
      return !!val;
    }
    default:
      break;
  }
  return val;
};

export const updateValuesType = (
  steps: Array<Array<ColumnValue>>,
  col: number,
  type: ColumnType
) =>
  immer(steps, draft => {
    for (let i = 0; i < steps.length; i += 1) {
      draft[i].values[col] = convertType(draft[i].values[col], type);
    }
  });
