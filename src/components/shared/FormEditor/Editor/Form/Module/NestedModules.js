import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DropTarget } from 'react-dnd';

import { moduleProps } from '@expandorg/modules';

import { EmptyDroppable } from './Placeholders';
import DnDModule from './DnDModule';

import { nestedModuleTarget, FORM_DND_ID } from '../../../dnd';

import styles from './NestedModules.module.styl';

class NestedModules extends Component {
  static propTypes = {
    caption: PropTypes.string,
    modules: PropTypes.arrayOf(moduleProps),
    path: PropTypes.arrayOf(PropTypes.number).isRequired,
    controls: PropTypes.object.isRequired, // eslint-disable-line
    selected: PropTypes.string,
    onMove: PropTypes.func.isRequired, // eslint-disable-line
    onSelect: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onCopy: PropTypes.func.isRequired,

    connectDropTarget: PropTypes.func.isRequired,
  };

  static defaultProps = {
    caption: null,
    modules: null,
    selected: null,
  };

  render() {
    const {
      caption,
      connectDropTarget,
      modules,
      selected,
      controls,
      path,
      onMove,
      onRemove,
      onSelect,
      onCopy,
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
              selected={selected}
              onMove={onMove}
              onRemove={onRemove}
              onSelect={onSelect}
              onCopy={onCopy}
            />
          ))
        ) : (
          <EmptyDroppable
            title={caption || 'Drop here'}
            path={path}
            onMove={onMove}
          />
        )}
      </div>
    );
  }
}

export default DropTarget(FORM_DND_ID, nestedModuleTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(NestedModules);
