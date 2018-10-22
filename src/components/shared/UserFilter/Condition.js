import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Autocomplete from '../../common/Autocomplete';

import { ReactComponent as X } from '../../assets/x.svg';

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

  handleChangeParam = ({ target }) => {
    const { onChange, condition, index } = this.props;
    onChange(
      {
        ...condition,
        param: target.value,
        op: undefined,
        value: undefined,
      },
      index
    );
  };

  handleChangeOp = ({ target }) => {
    const { onChange, condition, index } = this.props;
    onChange({ ...condition, op: target.value, value: undefined }, index);
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
              value={condition.param}
              onChange={this.handleChangeParam}
            />
          </div>
          <div className={styles.field}>
            <Autocomplete
              placeholder="Operation"
              value={condition.op}
              onChange={this.handleChangeOp}
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
