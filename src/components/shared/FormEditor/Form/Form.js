import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  moduleProps,
  moduleControls,
  getModuleControlsMap,
  FormDataProvider,
} from '@gemsorg/modules';

import Empty from './Empty';
import DnDModule from './Module/DnDModule';

import styles from './Form.module.styl';

const formData = {
  allowedRetries: 3,
  currentTry: 1,
};

export default class Form extends Component {
  static propTypes = {
    modules: PropTypes.arrayOf(moduleProps),
    onAddModule: PropTypes.func.isRequired,
    onMoveModule: PropTypes.func.isRequired,
    onSelectModule: PropTypes.func.isRequired,
    onRemoveModule: PropTypes.func.isRequired,
  };

  static defaultProps = {
    modules: [],
  };

  state = {
    controls: getModuleControlsMap(moduleControls),
  };

  render() {
    const {
      modules,
      onAddModule,
      onSelectModule,
      onRemoveModule,
      onMoveModule,
    } = this.props;

    const { controls } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.title}>Edit Task Module</div>
        <div className={styles.content}>
          {modules.length === 0 && <Empty onAdd={onAddModule} />}
          <div className={styles.form}>
            <FormDataProvider formData={formData}>
              {modules.map((module, order) => (
                <DnDModule
                  key={module.name}
                  controls={controls}
                  order={order}
                  id={module.name}
                  module={module}
                  onMove={onMoveModule}
                  onRemove={onRemoveModule}
                  onEdit={onSelectModule}
                />
              ))}
            </FormDataProvider>
          </div>
        </div>
      </div>
    );
  }
}
