import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DragSource, DropTarget } from 'react-dnd';

import { moduleProps } from '@gemsorg/modules';

import ModuleEdit from './ModuleEdit';

import Placeholder from './Placeholder';

import { moduleSource, moduleTarget, FORM_DND_ID } from '../../../dnd';

import styles from './DnDModule.module.styl';

class DnDModule extends Component {
  static propTypes = {
    module: moduleProps.isRequired,
    order: PropTypes.number.isRequired, // eslint-disable-line
    controls: PropTypes.object.isRequired, // eslint-disable-line
    isDragging: PropTypes.bool.isRequired,
    dimmed: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    onMove: PropTypes.func.isRequired, // eslint-disable-line
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,

    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  };

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      connectDragPreview,
      dimmed,
      selected,
      isDragging,
      module,
      onRemove,
      controls,
      onEdit,
    } = this.props;

    const dragging = isDragging || module.isDragging;

    return connectDragSource(
      connectDropTarget(
        <div
          className={styles.container}
          ref={c => {
            this.containerRef = c;
          }}
        >
          {!dragging ? (
            <ModuleEdit
              module={module}
              dimmed={dimmed}
              selected={selected}
              controls={controls}
              onEdit={onEdit}
              onRemove={onRemove}
              onPreview={connectDragPreview}
            />
          ) : (
            <Placeholder />
          )}
        </div>
      )
    );
  }
}

export default DropTarget(FORM_DND_ID, moduleTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(
  DragSource(FORM_DND_ID, moduleSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }))(DnDModule)
);
