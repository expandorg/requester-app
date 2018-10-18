import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { moduleProps, FormDataProvider } from '@gemsorg/modules';

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
    selected: PropTypes.string,
    controls: PropTypes.object.isRequired, // eslint-disable-line
    onAddModule: PropTypes.func.isRequired,
    onMoveModule: PropTypes.func.isRequired,
    onSelectModule: PropTypes.func.isRequired,
    onRemoveModule: PropTypes.func.isRequired,
  };

  static defaultProps = {
    modules: [],
    selected: null,
  };

  render() {
    const {
      modules,
      onAddModule,
      onSelectModule,
      onRemoveModule,
      onMoveModule,
      selected,
      controls,
    } = this.props;

    // TODO: outer drop target;

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
                  dimmed={selected !== null && module.name !== selected}
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