// @flow

import immer from 'immer';

type ColumnType = 'text' | 'number' | 'bool';

export const columnTypes = ['text', 'number', 'bool'];

type Column = {
  name: string,
  type: ColumnType,
  isAnswer: boolean,
};

type ColumnValue = string | number | boolean;

type Values = Array<Array<ColumnValue>>;

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

export const createNewRow = (columns: Array<Column>) =>
  columns.map(col => getDefaultValue(col.type));

const convertType = (val: ColumnValue, type: ColumnType): ColumnValue => {
  switch (type) {
    case 'text': {
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
  values: Values,
  col: number,
  type: ColumnType
) =>
  immer(values, draft => {
    for (let i = 0; i < draft.length; i += 1) {
      draft[i][col] = convertType(draft[i][col], type);
    }
  });
