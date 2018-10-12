import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { DragSource } from 'react-dnd';

import { ReactComponent as DragIcon } from '../../../assets/dragcursor.svg';

import styles from './ModuleItem.module.styl';

class ModuleItem extends Component {
  static propTypes = {
    module: PropTypes.shape({
      type: PropTypes.string,
    }).isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
  };

  render() {
    const {
      connectDragSource,
      connectDragPreview,
      isDragging,
      module,
    } = this.props;

    return connectDragPreview(
      <div className={cn(styles.container, { [styles.dragging]: isDragging })}>
        {connectDragSource(
          <div className={styles.drag}>
            <DragIcon />
          </div>
        )}
        <div className={styles.name}>{module.type}</div>
      </div>
    );
  }
}

const source = {
  beginDrag: props => ({ props }),
  endDrag: props => {
    console.log(props);
    // props.onMove(null, null, null, true);
  },
};

const collect = (connect, monitor) => ({
  isDragging: monitor.isDragging(),
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
});

export default DragSource('asd', source, collect)(ModuleItem);
