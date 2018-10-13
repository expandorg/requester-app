import React, { Component } from 'react';

import { moduleControls } from '@gemsorg/modules';

import ModuleItem from './ModuleItem';

import styles from './AvailableModules.module.styl';

const modulesMeta = moduleControls
  .map(c => c.module)
  .filter(m => typeof m.type === 'string');

export default class AvailableModules extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.list}>
          {modulesMeta.map(meta => (
            <ModuleItem meta={meta} key={meta.type} />
          ))}
        </div>
      </div>
    );
  }
}
