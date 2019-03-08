import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { DropdownBase, AutocompleteInput } from '@expandorg/components';

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

export const Dropdown = ({ bold, ...props }) => (
  <DropdownBase
    className={cn(styles.dropdown, { [styles.bold]: bold })}
    {...props}
  >
    {({ formatted, value }) => formatted || value}
  </DropdownBase>
);

Dropdown.propTypes = {
  bold: PropTypes.bool,
};

Dropdown.defaultProps = {
  bold: false,
};

export const Input = ({ ...props }) => (
  <AutocompleteInput className={styles.input} {...props} />
);

export const Statement = ({ children }) => (
  <div className={styles.statement}>{children}</div>
);
