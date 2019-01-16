import React from 'react';
import cn from 'classnames';

import { ToggleWalkthrough } from '../../../common/Walkthrough';
import { ReactComponent as Bulb } from '../../../assets/bulb.svg';

import styles from './Walkthrough.module.styl';

const Walkthrough = () => (
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
);

export default Walkthrough;
