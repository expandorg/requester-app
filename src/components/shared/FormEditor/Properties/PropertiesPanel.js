import React, { Component } from 'react';

import { moduleProps } from '@expandorg/modules';
import { Drawer } from '@expandorg/components';

import Properties from './Properties';

import styles from './PropertiesPanel.module.styl';

export default function PropertiesPanel({ module, ...rest }) {
  const visible = !!module;
  return (
    <Drawer className={styles.container} width={540} visible={visible}>
      {visible && <Properties key={module.name} module={module} {...rest} />}
    </Drawer>
  );
}

PropertiesPanel.propTypes = {
  module: moduleProps,
};

PropertiesPanel.defaultProps = {
  module: null,
};
