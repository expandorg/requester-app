import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import StatusIcon from './StatusIcon';

import styles from './Section.module.styl';

const Section = ({ children, title, status, blue }) => (
  <div className={cn(styles.container, { [styles.blue]: blue })}>
    {title && (
      <div className={styles.title}>
        {title}
        <StatusIcon status={status} />
      </div>
    )}
    <div className={styles.content}>{children}</div>
  </div>
);

Section.propTypes = {
  title: PropTypes.string,
  status: PropTypes.string,
  blue: PropTypes.bool,
};

Section.defaultProps = {
  title: null,
  status: null,
  blue: false,
};

export default Section;
