import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { DragSource } from 'react-dnd';

import { metaSource, FORM_DND_ID } from '../dnd';
import miniIcon from './icons/miniIcon';

import styles from './ModuleItem.module.styl';

class ModuleItem extends Component {
  static propTypes = {
    meta: PropTypes.shape({
      type: PropTypes.string,
    }).isRequired,
    isDragging: PropTypes.bool.isRequired,
    onEndDrag: PropTypes.func.isRequired, // eslint-disable-line
    onAdd: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
  };

  handleAdd = () => {
    const { onAdd, meta } = this.props;
    onAdd(meta);
  };

  render() {
    const { connectDragSource, isDragging, meta } = this.props;

    const classes = cn(styles.container, {
      [styles.dragging]: isDragging,
    });

    /* eslint-disable jsx-a11y/click-events-have-key-events  */
    /* eslint-disable jsx-a11y/no-static-element-interactions  */

    return connectDragSource(
      <div className={classes} onClick={this.handleAdd}>
        <div className={cn(styles.miniIcon, miniIcon(meta.type))}></div>
        <div className={styles.name}>{meta.name}</div>
      </div>
    );
  }
}

const collect = (connect, monitor) => ({
  isDragging: monitor.isDragging(),
  connectDragSource: connect.dragSource(),
});

export default DragSource(FORM_DND_ID, metaSource, collect)(ModuleItem);
