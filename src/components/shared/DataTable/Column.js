import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Dropdown } from '@gemsorg/components';

import { dataColumnProps } from '../propTypes';
import tableTypes from './table-types';

import styles from './Column.module.styl';

export default class Column extends Component {
  static propTypes = {
    column: dataColumnProps.isRequired, // eslint-disable-line
    index: PropTypes.number.isRequired,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    readOnly: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      original: props.column, // eslint-disable-line react/no-unused-state
      column: props.column,
      edit: false,
    };
  }

  static getDerivedStateFromProps({ column }, state) {
    if (column !== state.original) {
      return {
        column,
        original: column,
        edit: false,
      };
    }
    return null;
  }

  handleSkip = evt => {
    evt.preventDefault();

    const { onChange, column, index } = this.props;
    onChange({ ...column, skipped: true }, index);
  };

  handleToggleEdit = evt => {
    evt.preventDefault();

    const { edit, column, original } = this.state;

    if (edit) {
      this.setState({
        edit: false,
        column: original,
      });
    } else {
      this.setState({
        edit: true,
        column: column.skipped ? { ...column, skipped: false } : column,
      });
    }
  };

  handleSave = evt => {
    evt.preventDefault();
    const { onChange, index } = this.props;
    const { column } = this.state;

    this.setState({ edit: false });
    onChange(column, index);
  };

  handleChangeName = ({ target }) => {
    this.setState(({ column }) => ({
      column: { ...column, name: target.value },
    }));
  };

  handleChangeType = type => {
    this.setState(({ column }) => ({
      column: { ...column, type },
    }));
  };

  render() {
    const { edit, column, original } = this.state;
    const { readOnly } = this.props;

    return (
      <div className={styles.container}>
        {!edit && (
          <div className={styles.content}>
            <div className={styles.name}>{column.name}</div>
            {!column.skipped && (
              <div className={styles.type}>{column.type}</div>
            )}
            {column.skipped && (
              <div className={styles.skipped}>Will not be imported</div>
            )}
            {!readOnly && (
              <div className={styles.actions}>
                {!column.skipped && (
                  <button
                    className={cn(styles.button, styles.skip)}
                    onClick={this.handleSkip}
                  >
                    skip
                  </button>
                )}
                <button
                  className={cn(styles.button, styles.edit)}
                  onClick={this.handleToggleEdit}
                >
                  edit
                </button>
              </div>
            )}
          </div>
        )}
        {edit && (
          <div className={cn(styles.content, styles.absolute)}>
            <div className={styles.name}>{original.name}</div>
            <div className={styles.fields}>
              <input
                value={column.name}
                placeholder="Field name"
                onChange={this.handleChangeName}
                className={styles.input}
              />
              <Dropdown
                options={tableTypes}
                value={column.type}
                onChange={this.handleChangeType}
                className={styles.select}
              >
                {({ formatted }) => (
                  <div className={styles.selectVal}>{formatted}</div>
                )}
              </Dropdown>
            </div>
            <div className={styles.actions}>
              <button
                className={cn(styles.button, styles.skip)}
                onClick={this.handleToggleEdit}
              >
                Cancel
              </button>
              <button
                className={cn(styles.button, styles.save)}
                onClick={this.handleSave}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
