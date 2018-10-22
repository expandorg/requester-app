import React from 'react';
import PropTypes from 'prop-types';

import styles from './Hero.module.styl';

const Hero = ({ value, title }) => (
  <div className={styles.container}>
    <div className={styles.value}>{value || '0'}</div>
    <div className={styles.title}>{title}</div>
  </div>
);

Hero.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
};

export default Hero;
