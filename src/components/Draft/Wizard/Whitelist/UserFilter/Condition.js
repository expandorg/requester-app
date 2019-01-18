import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Autocomplete } from '@expandorg/components';

import { ReactComponent as X } from '../../../../assets/x.svg';

import { params, ops } from './filters';

import styles from './Condition.module.styl';

export default class Condition extends Component {
  static propTypes = {
    condition: PropTypes.shape({
      id: PropTypes.string,
      param: PropTypes.string,
      op: PropTypes.string,
      value: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  handleRemove = evt => {
    const { onRemove, index } = this.props;
    onRemove(index);
    evt.preventDefault();
  };

  handleChangeParam = param => {
    const { onChange, condition, index } = this.props;
    onChange(
      {
        ...condition,
        param,
        op: undefined,
        value: undefined,
      },
      index
    );
  };

  handleChangeOp = op => {
    const { onChange, condition, index } = this.props;
    onChange({ ...condition, op, value: undefined }, index);
  };

  handleChangeValue = ({ target }) => {
    const { onChange, condition, index } = this.props;
    onChange({ ...condition, value: target.value }, index);
  };

  render() {
    const { condition } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.field}>
            <Autocomplete
              placeholder="Parameter"
              options={params}
              value={condition.param}
              onChange={({ target }) => this.handleChangeParam(target.value)}
              onSelect={this.handleChangeParam}
            />
          </div>
          <div className={styles.field}>
            <Autocomplete
              placeholder="Operation"
              value={condition.op}
              options={ops[condition.param] || []}
              onChange={({ target }) => this.handleChangeOp(target.value)}
              onSelect={this.handleChangeOp}
            />
          </div>
          <div className={styles.field}>
            <Autocomplete
              placeholder="Value"
              value={condition.value}
              onChange={this.handleChangeValue}
            />
          </div>
        </div>
        <button className={styles.remove} onClick={this.handleRemove}>
          <X />
        </button>
      </div>
    );
  }
}
