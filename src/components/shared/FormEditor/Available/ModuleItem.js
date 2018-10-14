import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { DragSource } from 'react-dnd';

import { ReactComponent as DragIcon } from '../../../assets/dragcursor.svg';

import { metaSource, FORM_DND_ID } from '../dnd';

import styles from './ModuleItem.module.styl';

class ModuleItem extends Component {
  static propTypes = {
    meta: PropTypes.shape({
      type: PropTypes.string,
    }).isRequired,
    isDragging: PropTypes.bool.isRequired,
    totalModules: PropTypes.number.isRequired,  // eslint-disable-line
    onEndDrag: PropTypes.func.isRequired, // eslint-disable-line
    connectDragSource: PropTypes.func.isRequired,
  };

  render() {
    const { connectDragSource, isDragging, meta } = this.props;

    return connectDragSource(
      <div className={cn(styles.container, { [styles.dragging]: isDragging })}>
        <div className={styles.drag}>
          <DragIcon />
        </div>
        <div className={styles.name}>{meta.type}</div>
      </div>
    );
  }
}

const collect = (connect, monitor) => ({
  isDragging: monitor.isDragging(),
  connectDragSource: connect.dragSource(),
});

export default DragSource(FORM_DND_ID, metaSource, collect)(ModuleItem);
