import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { moduleControls } from '@gemsorg/modules';

import ModuleItem from './ModuleItem';

import styles from './AvailableModules.module.styl';

export default class AvailableModules extends Component {
  static propTypes = {
    onMoveModule: PropTypes.func.isRequired,
  };

  render() {
    const { onMoveModule } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.list}>
          {moduleControls
            .filter(c => typeof c.module.type === 'string')
            .map(control => (
              <ModuleItem
                meta={control.module}
                onMove={onMoveModule}
                key={control.module.type}
              />
            ))}
        </div>
      </div>
    );
  }
}
