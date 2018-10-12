import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { DragSource } from 'react-dnd';

import { ReactComponent as DragIcon } from '../../../assets/dragcursor.svg';

import { sourceItem, FORM_DND_ID } from '../dnd';

import styles from './ModuleItem.module.styl';

class ModuleItem extends Component {
  static propTypes = {
    meta: PropTypes.shape({
      type: PropTypes.string,
    }).isRequired,
    isDragging: PropTypes.bool.isRequired,
    onMove: PropTypes.func.isRequired, // eslint-disable-line
    connectDragPreview: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
  };

  render() {
    const {
      connectDragSource,
      connectDragPreview,
      isDragging,
      meta,
    } = this.props;

    return connectDragPreview(
      <div className={cn(styles.container, { [styles.dragging]: isDragging })}>
        {connectDragSource(
          <div className={styles.drag}>
            <DragIcon />
          </div>
        )}
        <div className={styles.name}>{meta.type}</div>
      </div>
    );
  }
}

const collect = (connect, monitor) => ({
  isDragging: monitor.isDragging(),
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
});

export default DragSource(FORM_DND_ID, sourceItem, collect)(ModuleItem);
