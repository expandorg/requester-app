import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './DataTable.module.styl';

export default function ValuesRow({ children, className }) {
  return <div className={cn(styles.row, className)}>{children}</div>;
}

ValuesRow.propTypes = {
  className: PropTypes.string,
};

ValuesRow.defaultProps = {
  className: null,
};
