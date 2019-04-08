import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from '../components';

import BoolExpression from './BoolExpression';

import styles from './SubExpression.module.styl';

const ops = ['||', '&&'];

export default function SubExpression({
  expression,
  options,
  onChange,
  op,
  onChangeOp,
  onAdd,
}) {
  return (
    <div className={styles.container}>
      <BoolExpression
        expression={expression}
        options={options}
        onChange={onChange}
      />
      {op && (
        <Dropdown
          className={styles.dd}
          value={op}
          options={ops}
          onChange={onChangeOp}
        />
      )}
      {onAdd && (
        <button className={styles.add} onClick={onAdd}>
          +
        </button>
      )}
    </div>
  );
}

SubExpression.propTypes = {
  expression: PropTypes.arrayOf(PropTypes.string).isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  op: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onChangeOp: PropTypes.func,
  onAdd: PropTypes.func,
};

SubExpression.defaultProps = {
  op: null,
  onChangeOp: null,
  onAdd: null,
};
