import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.styl';

const Actions = ({ children, className }) => (
  <div className={cn(styles.actions, className)}>{children}</div>
);

Actions.propTypes = {
  className: PropTypes.string,
};

Actions.defaultProps = {
  className: null,
};

export default Actions;
