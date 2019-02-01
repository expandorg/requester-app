import React, { Component } from 'react';
import PropTypes from 'prop-types';

import immer from 'immer';
import { removeAtIndex, replaceAtIndex, range } from '@expandorg/utils';

import {
  ScrollContainer,
  Table,
  Header,
  HeaderCell,
  Row,
  Cell,
} from '../../../../../../common/Table';

import Variable from './Variable';
import ValuesRow from './ValuesRow';

import styles from './DataTable.module.styl';

export default class DataTable extends Component {
  static propTypes = {
    data: PropTypes.shape({
      columns: PropTypes.arrayOf(PropTypes.string),
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
      values: [...data.values, range(data.columns.length).map(() => '')],
    });
  };

  handleChangeVar = (index, value) => {
    const { data, onUpdate } = this.props;
    onUpdate({
      ...data,
      columns: replaceAtIndex(data.columns, index, value),
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
      <ScrollContainer className={styles.scroll}>
        <Table>
          <Header>
            {data.columns.map((column, index) => (
              <Variable
                readOnly={readOnly}
                key={index}
                index={index}
                column={column}
                onChange={this.handleChangeVar}
              />
            ))}
            {!readOnly && <HeaderCell>Delete</HeaderCell>}
          </Header>

          {data.values.map((row, index) => (
            <ValuesRow
              key={index}
              index={index}
              row={row}
              readOnly={readOnly}
              onChange={this.handleChangeValue}
              onDelete={this.handleDeleteRow}
            />
          ))}
          {!readOnly && (
            <Row>
              <Cell className={styles.spacer} colSpan={data.columns.length} />
              <Cell className={styles.cellAdd}>
                <button className={styles.add} onClick={this.handleAddRow}>
                  +
                </button>
              </Cell>
            </Row>
          )}
        </Table>
      </ScrollContainer>
    );
  }
}
