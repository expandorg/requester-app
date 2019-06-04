import React, { useState } from 'react';
import cn from 'classnames';

import CreateDialog from '../../Create/CreateDialog';

import styles from './styles.module.styl';

export default function NewJob() {
  const [dialog, setDialog] = useState(false);
  return (
    <>
      <button
        to="/draft/create"
        onClick={() => setDialog(true)}
        className={cn(styles.container, styles.new)}
      >
        <div className={styles.plus}>+</div>
        <div className={styles.create}>Create Job</div>
      </button>
      {dialog && <CreateDialog onToogle={setDialog} />}
    </>
  );
}
