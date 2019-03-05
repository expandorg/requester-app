import React from 'react';
import cn from 'classnames';

import styles from './Outer.module.styl';

const Outer = ({ children }) => (
  <div className={cn(cn(styles.outer, 'gem-outer'))}>{children}</div>
);

export default Outer;
