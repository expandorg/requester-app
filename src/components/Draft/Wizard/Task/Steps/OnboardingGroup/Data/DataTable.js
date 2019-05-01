import React, { Component } from 'react';
import PropTypes from 'prop-types';

import immer from 'immer';
import { removeAtIndex, replaceAtIndex } from '@expandorg/utils';

import { Table as T } from '@expandorg/components';

import Variable from './Variable';
import Answer from './Answer';
import ValuesRow from './ValuesRow';

import {
  updateValuesType,
  removeValuesColumns,
  insertValuesColumn,
  createNewColumn,
  createNewRow,
} from '../../../../../../../model/onboardingData';

import styles from './DataTable.module.styl';

export default class DataTable extends Component {
  static propTypes = {
    data: PropTypes.shape({
      columns: PropTypes.arrayOf(PropTypes.object),
      steps: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    fields: PropTypes.arrayOf(PropTypes.string),
    readOnly: PropTypes.bool,
    onUpdate: PropTypes.func,
  };

  static defaultProps = {
    readOnly: false,
    fields: [],
    onUpdate: Function.prototype,
  };

  handleDeleteRow = index => {
    const { data, onUpdate } = this.props;
    onUpdate({
      ...data,
      steps: removeAtIndex(data.steps, index),
    });
  };

  handleAddRow = () => {
    const { data, onUpdate } = this.props;
    onUpdate({
      ...data,
      steps: [
        ...data.steps,
        { values: createNewRow(data.columns), answer: '' },
      ],
    });
  };

  handleChangeVar = (index, column) => {
    const { data, onUpdate } = this.props;

    const typeChanged = data.columns[index].type !== column.type;
    onUpdate({
      ...data,
      steps: typeChanged
        ? updateValuesType(data.steps, index, column.type)
        : data.steps,
      columns: replaceAtIndex(data.columns, index, column),
    });
  };

  handleAddVar = () => {
    const { data, onUpdate } = this.props;
    const column = createNewColumn(data.columns.length);
    onUpdate({
      ...data,
      steps: insertValuesColumn(data.steps, column.type),
      columns: [...data.columns, column],
    });
  };

  handleRemoveVar = index => {
    const { data, onUpdate } = this.props;
    onUpdate({
      ...data,
      steps: removeValuesColumns(data.steps, index),
      columns: removeAtIndex(data.columns, index),
    });
  };

  handleChangeValue = (row, col, value) => {
    const { data, onUpdate } = this.props;
    onUpdate(
      immer(data, draft => {
        draft.steps[row].values[col] = value;
      })
    );
  };

  handleChangeAnswerValue = (row, answer) => {
    const { data, onUpdate } = this.props;
    onUpdate(
      immer(data, draft => {
        draft.steps[row].answer = answer;
      })
    );
  };

  handleChangeAnswer = answer => {
    const { data, onUpdate } = this.props;
    onUpdate({ ...data, answer });
  };

  render() {
    const { data, fields, readOnly } = this.props;
    /* eslint-disable react/no-array-index-key */
    return (
      <T.ScrollContainer className={styles.scroll}>
        <T.Table>
          <T.Header>
            {data.columns.map((column, index) => (
              <Variable
                readOnly={readOnly}
                key={index}
                index={index}
                column={column}
                onChange={this.handleChangeVar}
                onRemove={this.handleRemoveVar}
              />
            ))}
            <Answer
              answer={data.answer}
              readOnly={readOnly}
              fields={fields}
              onChange={this.handleChangeAnswer}
            />
            {!readOnly && (
              <T.HeaderCell className={styles.clearCell}>
                <button className={styles.add} onClick={this.handleAddVar}>
                  +
                </button>
              </T.HeaderCell>
            )}
          </T.Header>

          {data.steps.map((row, index) => (
            <ValuesRow
              key={index}
              index={index}
              row={row}
              columns={data.columns}
              readOnly={readOnly}
              onChange={this.handleChangeValue}
              onChangeAnswer={this.handleChangeAnswerValue}
              onDelete={this.handleDeleteRow}
            />
          ))}
          {!readOnly && (
            <T.Row>
              {data.columns.length > 0 && (
                <T.Cell
                  className={styles.spacer}
                  colSpan={data.columns.length + 1}
                />
              )}
              <T.Cell className={styles.clearCell}>
                <button className={styles.add} onClick={this.handleAddRow}>
                  +
                </button>
              </T.Cell>
            </T.Row>
          )}
        </T.Table>
      </T.ScrollContainer>
    );
  }
}
