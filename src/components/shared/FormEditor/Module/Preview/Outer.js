import React from 'react';
import cn from 'classnames';

import styles from './Outer.module.styl';

export default function Outer({ children }) {
  return <div className={cn(styles.outer, 'gem-outer')}>{children}</div>;
}
