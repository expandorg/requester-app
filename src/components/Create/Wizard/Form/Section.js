import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as Checkmark } from '../../../assets/checkmark.svg';

import styles from './Section.module.styl';

const Section = ({ children, title, confirmed, blue }) => (
  <div className={cn(styles.container, { [styles.blue]: blue })}>
    <div className={styles.title}>
      {title}
      {confirmed && <Checkmark className={styles.checkmark} />}
    </div>
    <div className={styles.content}>{children}</div>
  </div>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  confirmed: PropTypes.bool,
  blue: PropTypes.bool,
};

Section.defaultProps = {
  confirmed: false,
  blue: false,
};

export default Section;
