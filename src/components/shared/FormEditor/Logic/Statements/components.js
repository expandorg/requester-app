import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Dropdown as UIDropdown } from '@expandorg/components';

import styles from './components.module.styl';

export const Row = ({ children }) => (
  <div className={styles.row}>{children}</div>
);

export const Text = ({ children, bold }) => (
  <span className={cn(styles.text, { [styles.bold]: bold })}>{children}</span>
);

Text.propTypes = {
  bold: PropTypes.bool,
};

Text.defaultProps = {
  bold: false,
};

export const Dropdown = ({ ...props }) => (
  <UIDropdown className={styles.dropdown} {...props} />
);
