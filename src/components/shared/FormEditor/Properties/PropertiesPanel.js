import React from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@expandorg/modules';
import { Drawer } from '@expandorg/components';

import Properties from './Properties';

import styles from './PropertiesPanel.module.styl';

export default function PropertiesPanel({ module, width, ...rest }) {
  const visible = !!module;
  return (
    <Drawer className={styles.container} width={width} visible={visible}>
      {visible && <Properties key={module.name} module={module} {...rest} />}
    </Drawer>
  );
}

PropertiesPanel.propTypes = {
  module: moduleProps,
  width: PropTypes.number,
};

PropertiesPanel.defaultProps = {
  module: null,
  width: 540,
};
