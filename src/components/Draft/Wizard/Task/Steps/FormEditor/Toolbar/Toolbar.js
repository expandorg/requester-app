import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Button } from '@expandorg/components';
import { ReactComponent as Bulb } from '@expandorg/uikit/assets/bulb.svg';

import { WalkthroughPin, ToggleWalkthrough } from '@expandorg/components/app';

import styles from './Toolbar.module.styl';
import { Bottombar } from '../../../../../../shared/FormEditor/Layout';

export default function Toolbar({ onCancel, onSave }) {
  return (
    <Bottombar>
      <div className={styles.previewContainer}></div>
      <div className={styles.buttons}>
        <ToggleWalkthrough>
          {({ onToggle, enabled }) => (
            <button
              className={cn(styles.toggle, { [styles.enabled]: enabled })}
              onClick={onToggle}
              id="gems-toggle"
            >
              <Bulb width={13} height={15} viewBox="0 0 9 15" />
            </button>
          )}
        </ToggleWalkthrough>
        <WalkthroughPin id="toggle" className={styles.togglePin} />
        <Button theme="grey" className={styles.btn} onClick={onCancel}>
          Cancel
        </Button>
        <Button className={styles.btn} onClick={onSave}>
          Save
        </Button>
      </div>
    </Bottombar>
  );
}
Toolbar.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
