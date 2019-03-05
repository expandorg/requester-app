import React, { Component } from 'react';

import { moduleProps } from '@expandorg/modules';
import { Drawer } from '@expandorg/components';

import Properties from './Properties';

import styles from './PropertiesPanel.module.styl';

export default class PropertiesPanel extends Component {
  static propTypes = {
    module: moduleProps,
  };

  static defaultProps = {
    module: null,
  };

  render() {
    const { module, ...rest } = this.props;
    const visible = !!module;
    return (
      <Drawer className={styles.container} width={540} visible={visible}>
        {visible && <Properties key={module.name} module={module} {...rest} />}
      </Drawer>
    );
  }
}
