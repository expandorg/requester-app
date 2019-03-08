// @flow

import immer from 'immer';

type ColumnType = 'text' | 'number' | 'bool';

export const columnTypes = ['text', 'number', 'bool'];

export type Column = {
  name: string,
  type: ColumnType,
  isAnswer: boolean,
};

export type ColumnValue = string | number | boolean | null;

export type OnboardingGroupData = {
  columns: Array<Column>,
  values: Array<Array<ColumnValue>>,
};

export const dataToVars = ({
  values,
  columns,
}: OnboardingGroupData): Array<{ answer: ?string, variables: Object }> =>
  values.map(row => {
    let answer = null;
    const variables = columns.reduce((set, col, index) => {
      if (!col.isAnswer) {
        set[col.name] = row[index];
      } else {
        answer = row[index];
      }
      return set;
    }, {});
    return { variables, answer };
  });

const getDefaultValue = (type: ColumnType): ColumnValue => {
  switch (type) {
    case 'text':
      return '';
    case 'number':
      return null;
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
  values: Array<Array<ColumnValue>>,
  col: number,
  type: ColumnType
) =>
  immer(values, draft => {
    for (let i = 0; i < draft.length; i += 1) {
      draft[i][col] = convertType(draft[i][col], type);
    }
  });
