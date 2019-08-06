import React from 'react';
import PropTypes from 'prop-types';

import styles from './SummaryField.module.styl';

const getValue = (type, value) => {
  if (type === 'bool') {
    return value ? 'True' : 'False';
  }
  return value;
};

export default function SummaryField({ title, value, type }) {
  return (
    <div className={styles.item}>
      <div className={styles.title}>{title}</div>
      <div>{getValue(type, value)}</div>
    </div>
  );
}

SummaryField.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.any, // eslint-disable-line
  type: PropTypes.string,
};

SummaryField.defaultProps = {
  value: null,
  type: 'string',
};
