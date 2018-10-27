import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './HeroWarning.module.styl';

const HeroWarning = ({ className, children, icon }) => (
  <div className={cn(styles.container, className)}>
    <div className={styles.icon}>{icon}</div>
    <div className={styles.description}>{children}</div>
  </div>
);

HeroWarning.propTypes = {
  icon: PropTypes.element.isRequired,
  className: PropTypes.string,
};

HeroWarning.defaultProps = {
  className: null,
};

export default HeroWarning;
