import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DropTarget } from 'react-dnd';

import { moduleProps } from '@gemsorg/modules';

import EmptyDroppable from './EmptyDroppable';
import DnDModule from './DnDModule';

import { nestedModuleTarget, FORM_DND_ID } from '../../../dnd';

import styles from './DnDModule.module.styl';

class NestedModules extends Component {
  static propTypes = {
    modules: PropTypes.arrayOf(moduleProps),
    path: PropTypes.arrayOf(PropTypes.number).isRequired,
    controls: PropTypes.object.isRequired, // eslint-disable-line
    selected: PropTypes.bool.isRequired,
    onMove: PropTypes.func.isRequired, // eslint-disable-line
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,

    connectDropTarget: PropTypes.func.isRequired,
  };

  static defaultProps = {
    modules: null,
  };

  render() {
    const {
      connectDropTarget,
      modules,
      selected,
      controls,
      path,
      onMove,
      onRemove,
      onEdit,
    } = this.props;

    const hasNested = modules && modules.length > 0;

    return connectDropTarget(
      <div className={styles.nested}>
        {hasNested ? (
          modules.map((nestedModule, nestedOrder) => (
            <DnDModule
              key={nestedModule.name}
              path={[...path, nestedOrder]}
              module={nestedModule}
              controls={controls}
              dimmed={selected !== null && nestedModule.name !== selected}
              selected={selected !== null && nestedModule.name === selected}
              onMove={onMove}
              onRemove={onRemove}
              onEdit={onEdit}
            />
          ))
        ) : (
          <EmptyDroppable path={path} onMove={onMove} />
        )}
      </div>
    );
  }
}

export default DropTarget(FORM_DND_ID, nestedModuleTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(NestedModules);
