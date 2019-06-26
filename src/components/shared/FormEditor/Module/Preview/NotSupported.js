import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Icon } from '@expandorg/uikit/assets/warning.svg';
import { Tooltip } from '@expandorg/components';

import Outer from './Outer';
import Sidepanel from './Sidepanel';

import styles from './NotSupported.module.styl';

const Warning = Tooltip(({ children, ...rest }) => (
  <span className={styles.tooltip} {...rest}>
    <Icon width={24} height={24} viewBox="0 0 42 42" />
    {children}
  </span>
));

export default function NotSupported({ type, onRemove }) {
  return (
    <Outer>
      <div className={styles.container}>
        <Warning
          tooltipOrientation="right"
          tooltip="This component has been deprecated. Please update."
        />
        <span className={styles.name}>{type} module</span>
      </div>
      <Sidepanel onRemove={onRemove} />
    </Outer>
  );
}

NotSupported.propTypes = {
  type: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};
