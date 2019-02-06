import React from 'react';
import PropTypes from 'prop-types';

import styles from './SummaryField.module.styl';

const getValue = (type, value) => {
  if (type === 'bool') {
    return value ? 'True' : 'False';
  }
  return value;
};

const SummaryField = ({ title, value, type }) => (
  <div className={styles.item}>
    <div className={styles.title}>{title}</div>
    <div>{getValue(type, value)}</div>
  </div>
);

SummaryField.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.any, // eslint-disable-line
  type: PropTypes.string,
};

SummaryField.defaultProps = {
  value: null,
  type: 'string',
};

export default SummaryField;
