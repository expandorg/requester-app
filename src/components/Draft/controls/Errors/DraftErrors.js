import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Warning } from '../../../../assets/warning.svg';

import DraftValidator from '../../../../model/DraftValidator';
import DraftErrorsBuilder from './DraftErrorsBuilder';
import { ErrorsContextMenu, ErrorsMenuItem } from './ErrorsMenu';

import styles from './DraftErrors.module.styl';

export default function DraftErrors({ validation, onNavigate }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState(null);

  const toggle = useCallback(
    (evt) => {
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

  const navigate = useCallback(
    (nav) => {
      onNavigate(nav);
      setVisible(false);
    },
    [onNavigate]
  );

  const count = DraftValidator.errorsCount(validation);
  if (!count) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <button className={styles.button} onClick={toggle} ref={ref}>
          <Warning className={styles.warning} />
        </button>
        {visible && (
          <ErrorsContextMenu pos={pos} validation={validation} onHide={toggle}>
            {DraftErrorsBuilder.errorMessages(validation).map(
              ({ path, message, nav }) => (
                <ErrorsMenuItem
                  key={path}
                  path={path}
                  message={message}
                  onClick={() => navigate(nav)}
                />
              )
            )}
          </ErrorsContextMenu>
        )}
      </div>
    </div>
  );
}

DraftErrors.propTypes = {
  validation: PropTypes.shape({}).isRequired,
  onNavigate: PropTypes.func.isRequired,
};
