import React, { Component } from 'react';
import PropTypes from 'prop-types';

import immer from 'immer';
import { removeAtIndex, replaceAtIndex } from '@expandorg/utils';

import { Table as T } from '@expandorg/components';

import Variable from './Variable';
import ValuesRow from './ValuesRow';

import { updateValuesType, createNewRow } from './quizData';

import styles from './DataTable.module.styl';

export default class DataTable extends Component {
  static propTypes = {
    data: PropTypes.shape({
      columns: PropTypes.arrayOf(PropTypes.object),
      values: PropTypes.arrayOf(PropTypes.array),
    }).isRequired,
    readOnly: PropTypes.bool,
    onUpdate: PropTypes.func,
  };

  static defaultProps = {
    readOnly: false,
    onUpdate: Function.prototype,
  };

  handleDeleteRow = index => {
    const { data, onUpdate } = this.props;
    onUpdate({
      ...data,
      values: removeAtIndex(data.values, index),
    });
  };

  handleAddRow = () => {
    const { data, onUpdate } = this.props;
    onUpdate({
      ...data,
      values: [...data.values, createNewRow(data.columns)],
    });
  };

  handleChangeVar = (index, column) => {
    const { data, onUpdate } = this.props;

    const typeChanged = data.columns[index].type !== column.type;
    onUpdate({
      ...data,
      values: typeChanged
        ? updateValuesType(data.values, index, column.type)
        : data.values,
      columns: replaceAtIndex(data.columns, index, column),
    });
  };

  handleChangeValue = (row, col, value) => {
    const { data, onUpdate } = this.props;
    onUpdate(
      immer(data, draft => {
        draft.values[row][col] = value;
      })
    );
  };

  render() {
    const { data, readOnly } = this.props;
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
              />
            ))}
            {!readOnly && (
              <T.HeaderCell className={styles.varDelete}>Delete</T.HeaderCell>
            )}
          </T.Header>

          {data.values.map((row, index) => (
            <ValuesRow
              key={index}
              index={index}
              row={row}
              columns={data.columns}
              readOnly={readOnly}
              onChange={this.handleChangeValue}
              onDelete={this.handleDeleteRow}
            />
          ))}
          {!readOnly && (
            <T.Row>
              <T.Cell className={styles.spacer} colSpan={data.columns.length} />
              <T.Cell className={styles.cellAdd}>
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
