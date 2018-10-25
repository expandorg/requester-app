import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DropTarget } from 'react-dnd';
import { moduleProps, FormDataProvider } from '@gemsorg/modules';

import { dropAreaTarget, FORM_DND_ID } from '../../dnd';

import Empty from './Empty';
import DnDModule from './Module/DnDModule';

import styles from './Form.module.styl';

const formData = {
  allowedRetries: 3,
  currentTry: 1,
};

class Form extends Component {
  static propTypes = {
    modules: PropTypes.arrayOf(moduleProps),
    selected: PropTypes.string,
    controls: PropTypes.object.isRequired, // eslint-disable-line
    onAddModule: PropTypes.func.isRequired,
    onMoveModule: PropTypes.func.isRequired,
    onSelectModule: PropTypes.func.isRequired,
    onRemoveModule: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
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
      connectDropTarget,
    } = this.props;

    return (
      <div className={styles.container}>
        {connectDropTarget(
          <div className={styles.form}>
            {modules.length === 0 && <Empty onAdd={onAddModule} />}
            <FormDataProvider formData={formData}>
              {modules.map((module, order) => (
                <DnDModule
                  key={module.name}
                  controls={controls}
                  order={order}
                  id={module.name}
                  dimmed={selected !== null && module.name !== selected}
                  selected={selected !== null && module.name === selected}
                  module={module}
                  onMove={onMoveModule}
                  onRemove={onRemoveModule}
                  onEdit={onSelectModule}
                />
              ))}
            </FormDataProvider>
          </div>
        )}
      </div>
    );
  }
}

export default DropTarget(FORM_DND_ID, dropAreaTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(Form);
