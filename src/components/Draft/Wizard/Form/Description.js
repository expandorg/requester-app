import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import styles from './styles.module.styl';

const Description = ({ children, className }) => (
  <div className={cn(styles.description, className)}>{children}</div>
);

Description.propTypes = {
  className: PropTypes.string,
};

Description.defaultProps = {
  className: null,
};

export default Description;
