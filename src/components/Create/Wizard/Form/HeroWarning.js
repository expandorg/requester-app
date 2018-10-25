import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as Warning } from '../../../assets/warning.svg';

import styles from './HeroWarning.module.styl';

const HeroWarning = ({ className, children, icon }) => (
  <div className={cn(styles.container, className)}>
    <div className={styles.icon}>{icon}</div>
    <div className={styles.description}>{children}</div>
  </div>
);

HeroWarning.propTypes = {
  icon: PropTypes.element,
  className: PropTypes.string,
};

HeroWarning.defaultProps = {
  className: null,
  icon: <Warning width="64px" height="64px" viewBox="0 0 42 42" />,
};

export default HeroWarning;
