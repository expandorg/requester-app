import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

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
} from '../../../../../model/onboardingData';

import styles from './DataTable.module.styl';

export default class DataTable extends Component {
  static propTypes = {
    data: PropTypes.shape({
      columns: PropTypes.arrayOf(PropTypes.object),
      steps: PropTypes.arrayOf(PropTypes.object),
      answer: PropTypes.string,
    }).isRequired,
    fields: PropTypes.arrayOf(PropTypes.string),
    onUpdate: PropTypes.func,
  };

  static defaultProps = {
    fields: [],
    onUpdate: Function.prototype,
  };

  handleDeleteRow = (index) => {
    const { data, onUpdate } = this.props;
    onUpdate(
      immer(data, (draft) => {
        draft.steps[index] = null;
        draft.steps = draft.steps.filter((s) => s !== null);
      })
    );
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

  handleDeleteVar = (index) => {
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
      immer(data, (draft) => {
        draft.steps[row].values[col] = value;
      })
    );
  };

  handleChangeAnswerValue = (row, answer) => {
    const { data, onUpdate } = this.props;
    onUpdate(
      immer(data, (draft) => {
        draft.steps[row].answer = answer;
      })
    );
  };

  handleChangeAnswer = (answer) => {
    const { data, onUpdate } = this.props;
    onUpdate({ ...data, answer });
  };

  render() {
    const { data, fields } = this.props;
    const single = data.steps.length === 1;
    /* eslint-disable react/no-array-index-key */
    return (
      <T.ScrollContainer className={styles.scroll}>
        <T.Table>
          <T.Header>
            <T.Cell className={styles.leftCell} />
            {data.columns.map((column, index) => (
              <Variable
                key={index}
                index={index}
                column={column}
                onChange={this.handleChangeVar}
                onDelete={this.handleDeleteVar}
              />
            ))}
            <Answer
              answer={data.answer}
              fields={fields}
              onChange={this.handleChangeAnswer}
            />
            <T.HeaderCell className={styles.addCell}>
              <button
                className={cn(styles.btn, styles.col)}
                onClick={this.handleAddVar}
              >
                <div className={styles.plus}>+</div>
                <div>Add Answer Choice</div>
              </button>
            </T.HeaderCell>
          </T.Header>

          {data.steps.map((row, index) => (
            <ValuesRow
              key={index}
              index={index}
              row={row}
              columns={data.columns}
              onChange={this.handleChangeValue}
              onChangeAnswer={this.handleChangeAnswerValue}
              onDelete={!single ? this.handleDeleteRow : null}
            />
          ))}
          <T.Row>
            <td />
            <T.Cell
              className={styles.addCell}
              colSpan={data.columns.length + 1}
            >
              <button
                className={cn(styles.btn, styles.row)}
                onClick={this.handleAddRow}
              >
                <span className={styles.plus}>+</span> Add Question
              </button>
            </T.Cell>
            <td />
          </T.Row>
        </T.Table>
      </T.ScrollContainer>
    );
  }
}
