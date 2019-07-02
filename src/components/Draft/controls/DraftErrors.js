import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Down } from '../../../assets/arrow_drop_down.svg';
import { ReactComponent as Up } from '../../../assets/arrow_drop_up.svg';
import { ReactComponent as Warning } from '../../../assets/warning.svg';

import DraftValidator from '../../../model/DraftValidator';
import { ErrorsContextMenu, ErrorsMenuItem } from './ErrorsMenu';

import styles from './DraftErrors.module.styl';

export default function DraftErrors({ validation }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState(null);

  const toggle = useCallback(
    evt => {
      if (evt) {
        evt.preventDefault();
        evt.stopPropagation();
      }
      if (!visible) {
        setPos(ref.current.getBoundingClientRect());
      }
      setVisible(!visible);
    },
    [visible]
  );

  const count = DraftValidator.errorsCount(validation);
  if (!count) {
    return null;
  }

  const UpDown = visible ? Up : Down;
  return (
    <div className={styles.container} ref={ref}>
      <button className={styles.button} onClick={toggle}>
        <Warning className={styles.warning} />
        {count} {count === 1 ? 'Error' : 'Errors'}
        <UpDown className={styles.updown} />
      </button>
      {visible && (
        <ErrorsContextMenu pos={pos} validation={validation} onHide={toggle}>
          {DraftValidator.errorMessages(validation).map(({ path, message }) => (
            <ErrorsMenuItem key={path} path={path} message={message} />
          ))}
        </ErrorsContextMenu>
      )}
    </div>
  );
}

DraftErrors.propTypes = {
  validation: PropTypes.shape({}).isRequired,
};
