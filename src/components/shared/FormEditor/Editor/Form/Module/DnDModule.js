import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DragSource, DropTarget } from 'react-dnd';

import { moduleProps } from '@expandorg/modules';

import Placeholder from './Placeholder';
import ModulePreview from './ModulePreview';

import { moduleSource, moduleTarget, FORM_DND_ID } from '../../../dnd';

import styles from './DnDModule.module.styl';

class DnDModule extends Component {
  static propTypes = {
    module: moduleProps.isRequired,
    path: PropTypes.arrayOf(PropTypes.number).isRequired,
    controls: PropTypes.object.isRequired, // eslint-disable-line
    isDragging: PropTypes.bool.isRequired,
    selected: PropTypes.string,
    onMove: PropTypes.func.isRequired, // eslint-disable-line
    onSelect: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,

    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selected: null,
  };

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      connectDragPreview,
      isDragging,
      module,
      selected,
      controls,
      path,
      onMove,
      onRemove,
      onSelect,
    } = this.props;

    const dragging = isDragging || module.isDragging;

    return connectDragSource(
      connectDropTarget(
        <div
          className={styles.dndContainer}
          ref={c => {
            this.containerRef = c;
          }}
        >
          {!dragging ? (
            <ModulePreview
              module={module}
              connectDragPreview={connectDragPreview}
              path={path}
              controls={controls}
              selected={selected}
              onMove={onMove}
              onSelect={onSelect}
              onRemove={onRemove}
            />
          ) : (
            <Placeholder className={styles.placeholder} />
          )}
        </div>
      )
    );
  }
}

const DndContainer = DropTarget(FORM_DND_ID, moduleTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(
  DragSource(FORM_DND_ID, moduleSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }))(DnDModule)
);

export default DndContainer;
