import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Table as T, Button, Dropdown } from '@expandorg/components';

import styles from './Variable.module.styl';

import { columnTypes } from '../../../../../../../../model/onboardingData';

export default class Variable extends Component {
  static propTypes = {
    column: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.oneOf(columnTypes),
    }).isRequired,
    index: PropTypes.number.isRequired,
    readOnly: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
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

  handleToggleEdit = evt => {
    evt.preventDefault();

    const { edit, original } = this.state;

    this.setState({
      edit: !edit,
      column: original,
    });
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

  handleSave = evt => {
    evt.preventDefault();

    const { onChange, index } = this.props;
    const { column } = this.state;

    this.setState({ edit: false });
    onChange(index, column);
  };

  handleRemove = () => {
    const { onRemove, index } = this.props;
    onRemove(index);
  };

  render() {
    const { readOnly } = this.props;
    const { column, edit } = this.state;

    return (
      <T.HeaderCell className={styles.var}>
        <div className={styles.container}>
          {!edit && (
            <div className={styles.content}>
              <button className={styles.remove} onClick={this.handleRemove}>
                -
              </button>
              <div className={styles.name}>{column.name}</div>
              <div className={styles.type}>{column.type}</div>
              {!readOnly && (
                <div className={styles.actions}>
                  <Button
                    size="small"
                    theme="white-blue"
                    className={styles.edit}
                    onClick={this.handleToggleEdit}
                  >
                    edit
                  </Button>
                </div>
              )}
            </div>
          )}
          {edit && (
            <div className={cn(styles.content, styles.absolute)}>
              <div className={styles.fields}>
                <input
                  type="text"
                  value={column.name}
                  placeholder="Variable name"
                  onChange={this.handleChangeName}
                  className={styles.input}
                />
                <Dropdown
                  className={styles.dropdown}
                  options={columnTypes}
                  value={column.type}
                  onChange={this.handleChangeType}
                />
              </div>
              <div className={styles.actions}>
                <Button
                  size="small"
                  theme="white-blue"
                  className={styles.skip}
                  onClick={this.handleToggleEdit}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  className={styles.save}
                  onClick={this.handleSave}
                >
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </T.HeaderCell>
    );
  }
}
