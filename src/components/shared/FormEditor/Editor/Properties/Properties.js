import React, { Component } from 'react';

import { moduleProps } from '@gemsorg/modules';

import Drawer from '../../../../common/Drawer';

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
      <Drawer className={styles.container} width={450} visible={visible}>
        {visible && <PropertiesForm module={module} {...rest} />}
      </Drawer>
    );
  }
}
