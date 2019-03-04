import React, { Component } from 'react';

import { moduleProps } from '@expandorg/modules';
import { Drawer } from '@expandorg/components';

import PropertiesForm from './PropertiesForm';

import styles from './Properties.module.styl';

export default class Properties extends Component {
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
        {visible && (
          <PropertiesForm key={module.name} module={module} {...rest} />
        )}
      </Drawer>
    );
  }
}
