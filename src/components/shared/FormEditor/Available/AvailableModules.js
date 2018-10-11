import React, { Component } from 'react';

import { moduleControls } from '@gemsorg/modules';

import ModuleItem from './ModuleItem';

import styles from './AvailableModules.module.styl';

export default class AvailableModules extends Component {
  render() {
    return (
      <div className={styles.container}>
        {moduleControls.map(control => (
          <ModuleItem module={control.module} key={control.module.type} />
        ))}
      </div>
    );
  }
}
