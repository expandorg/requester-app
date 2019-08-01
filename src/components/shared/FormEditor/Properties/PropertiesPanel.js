import React from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@expandorg/modules';
import { Drawer, useSyncedState } from '@expandorg/components';

import Properties from './Properties';

import styles from './PropertiesPanel.module.styl';

export default function PropertiesPanel({
  module: original,
  width,
  onSave,
  onCancel,
  ...rest
}) {
  const [module, changeModule] = useSyncedState(original);

  const visible = !!module;
  return (
    <Drawer className={styles.container} width={width} visible={visible}>
      {visible && (
        <Properties
          key={module.name}
          onChange={changeModule}
          onSave={onSave}
          onCancel={onCancel}
          module={module}
          {...rest}
        />
      )}
    </Drawer>
  );
}

PropertiesPanel.propTypes = {
  module: moduleProps,
  width: PropTypes.number,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

PropertiesPanel.defaultProps = {
  module: null,
  width: 540,
};
