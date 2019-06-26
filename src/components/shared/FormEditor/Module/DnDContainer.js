import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DragSource, DropTarget } from 'react-dnd';

import { moduleProps } from '@expandorg/modules';

import { Placeholder } from './Placeholders';

import { moduleSource, moduleTarget, FORM_DND_ID } from '../model/dnd';

import styles from './DnDContainer.module.styl';

class DnDModule extends Component {
  static propTypes = {
    module: moduleProps.isRequired,
    path: PropTypes.arrayOf(PropTypes.number).isRequired, // eslint-disable-line
    controls: PropTypes.object.isRequired, // eslint-disable-line
    isDragging: PropTypes.bool.isRequired,

    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  };

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      connectDragPreview,
      isDragging,
      module,
      children,
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
            children({ connectDragPreview })
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
