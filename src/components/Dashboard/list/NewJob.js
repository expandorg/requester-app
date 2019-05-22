import React from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import styles from './styles.module.styl';

export default function NewJob() {
  return (
    <Link to="/draft/create" className={cn(styles.container, styles.new)}>
      <div className={styles.plus}>+</div>
      <div className={styles.create}>Create Job</div>
    </Link>
  );
}
