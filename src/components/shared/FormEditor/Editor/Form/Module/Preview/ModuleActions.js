import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as X } from '@expandorg/uikit/assets/x.svg';
import { ReactComponent as Copy } from '@expandorg/uikit/assets/copy.svg';

import styles from './ModuleActions.module.styl';

const ModuleActions = ({ onRemove, onCopy, canCopy }) => (
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

ModuleActions.propTypes = {
  onRemove: PropTypes.func.isRequired,
  onCopy: PropTypes.func,
  canCopy: PropTypes.bool,
};

ModuleActions.defaultProps = {
  onCopy: null,
  canCopy: false,
};

export default ModuleActions;
