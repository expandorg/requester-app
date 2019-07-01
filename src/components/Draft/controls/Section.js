import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Section.module.styl';

const Section = ({ children, title, blue, onStep }) => (
  <div className={cn(styles.container, { [styles.blue]: blue })}>
    {title && (
      // eslint-disable-next-line
      <div className={styles.title} onClick={onStep}>
        {title}
      </div>
    )}
    <div className={styles.content}>{children}</div>
  </div>
);

Section.propTypes = {
  title: PropTypes.string,
  blue: PropTypes.bool,
  onStep: PropTypes.func,
};

Section.defaultProps = {
  title: null,
  blue: false,
  onStep: Function.prototype,
};

export default Section;
