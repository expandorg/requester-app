import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { moduleControls } from '@gemsorg/modules';

import ModuleItem from './ModuleItem';

import styles from './AvailableModules.module.styl';

const modulesMeta = moduleControls
  .map(c => c.module)
  .filter(m => typeof m.type === 'string');

export default class AvailableModules extends Component {
  static propTypes = {
    totalModules: PropTypes.number.isRequired,
    onEndDrag: PropTypes.func.isRequired,
    onAddModule: PropTypes.func.isRequired,
  };

  render() {
    const { totalModules, onAddModule, onEndDrag } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.list}>
          {modulesMeta.map(meta => (
            <ModuleItem
              meta={meta}
              key={meta.type}
              onEndDrag={onEndDrag}
              onAdd={onAddModule}
              totalModules={totalModules}
            />
          ))}
        </div>
      </div>
    );
  }
}
