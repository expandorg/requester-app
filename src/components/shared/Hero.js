import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Hero.module.styl';

const Hero = ({ className, value, title }) => (
  <div className={cn(styles.container, className)}>
    <div className={styles.value}>{value || '0'}</div>
    <div className={styles.title}>{title}</div>
  </div>
);

Hero.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Hero.defaultProps = {
  className: null,
};

export default Hero;
