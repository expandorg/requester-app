import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Input } from '@expandorg/components';

import styles from './Calculator.module.styl';

const Field = ({
  placeholder1,
  value1,
  onChange1,
  placeholder2,
  value2,
  onChange2,
  total,
  disabled,
}) => (
  <div className={cn(styles.field, { [styles.disabled]: disabled })}>
    <div className={styles.vlong}>
      <Input
        className={styles.input}
        value={value1}
        disabled={disabled}
        onChange={({ target }) => onChange1(target.value)}
        placeholder={placeholder1}
      />
    </div>
    <div className={styles.x}>x</div>
    <div className={styles.vshort}>
      <Input
        className={styles.input}
        value={value2}
        disabled={disabled}
        onChange={({ target }) => onChange2(target.value)}
        placeholder={placeholder2}
      />
    </div>
    <div className={styles.subtotal}>= {total} XPN</div>
  </div>
);

Field.propTypes = {
  placeholder1: PropTypes.string.isRequired,
  placeholder2: PropTypes.string.isRequired,
  value1: PropTypes.string,
  value2: PropTypes.string,
  onChange1: PropTypes.func.isRequired,
  onChange2: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
};
Field.defaultProps = {
  value1: '',
  value2: '',
  disabled: false,
};

export default Field;
