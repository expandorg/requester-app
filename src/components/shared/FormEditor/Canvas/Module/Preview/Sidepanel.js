import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as X } from '@expandorg/uikit/assets/x.svg';
import { ReactComponent as Copy } from '@expandorg/uikit/assets/copy.svg';

import styles from './Sidepanel.module.styl';

export default function Sidepanel({ onRemove, onCopy, canCopy }) {
  return (
    <div className={styles.actions}>
      <button className={styles.remove} onClick={onRemove}>
        <X />
      </button>
      {canCopy && (
        <button className={styles.copy} onClick={onCopy}>
          <Copy />
        </button>
      )}
    </div>
  );
}

Sidepanel.propTypes = {
  onRemove: PropTypes.func.isRequired,
  onCopy: PropTypes.func,
  canCopy: PropTypes.bool,
};

Sidepanel.defaultProps = {
  onCopy: null,
  canCopy: false,
};
