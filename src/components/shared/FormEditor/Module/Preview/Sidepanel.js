import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as Copy } from '../../../../../assets/copy.svg';
import { ReactComponent as Logic } from '../../../../../assets/logic.svg';
import { ReactComponent as Del } from '../../../../../assets/delete.svg';

import styles from './Sidepanel.module.styl';

export default function Sidepanel({
  onRemove,
  onCopy,
  canCopy,
  onLogic,
  canApplyLogic,
  nested,
}) {
  return (
    <div className={cn(styles.actions, { [styles.nested]: nested })}>
      <button className={styles.remove} onClick={onRemove}>
        <Del />
      </button>
      {canCopy && (
        <button className={styles.copy} onClick={onCopy}>
          <Copy width="20" height="20" viewBox="0 0 24 24" />
        </button>
      )}
      {canApplyLogic && (
        <button className={styles.logic} onClick={onLogic}>
          <Logic />
        </button>
      )}
    </div>
  );
}

Sidepanel.propTypes = {
  onRemove: PropTypes.func.isRequired,
  onCopy: PropTypes.func,
  canCopy: PropTypes.bool,
  onLogic: PropTypes.func,
  canApplyLogic: PropTypes.bool,
  nested: PropTypes.bool,
};

Sidepanel.defaultProps = {
  onCopy: null,
  canCopy: false,
  onLogic: null,
  canApplyLogic: false,
  nested: false,
};
