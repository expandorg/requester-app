import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import CreateDialog from '../../Create/CreateDialog';

import styles from './styles.module.styl';

export default function NewJob({ small }) {
  const [dialog, setDialog] = useState(false);
  const toggle = useCallback(() => {
    setDialog(true);
  }, []);
  return (
    <>
      {small && (
        <button onClick={toggle} className={styles.inlineNew}>
          +
        </button>
      )}
      {!small && (
        <button onClick={toggle} className={cn(styles.container, styles.new)}>
          <div className={styles.plus}>+</div>
          <div className={styles.create}>Create Job</div>
        </button>
      )}
      {dialog && <CreateDialog onToogle={setDialog} />}
    </>
  );
}

NewJob.propTypes = {
  small: PropTypes.bool,
};

NewJob.defaultProps = {
  small: false,
};
