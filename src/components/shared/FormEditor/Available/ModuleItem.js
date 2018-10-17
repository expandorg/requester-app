import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { DragSource } from 'react-dnd';

import { metaSource, FORM_DND_ID, uniqName } from '../dnd';

import { ReactComponent as DragIcon } from '../../../assets/dragcursor.svg';
import { ReactComponent as Icon } from '../../../assets/data.svg';

import styles from './ModuleItem.module.styl';

class ModuleItem extends Component {
  static propTypes = {
    meta: PropTypes.shape({
      type: PropTypes.string,
    }).isRequired,
    isDragging: PropTypes.bool.isRequired,
    offset: PropTypes.number.isRequired,
    isHovered: PropTypes.bool.isRequired,
    totalModules: PropTypes.number.isRequired,  // eslint-disable-line
    onEndDrag: PropTypes.func.isRequired, // eslint-disable-line
    onAdd: PropTypes.func.isRequired,
    onPreview: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
  };

  state = {
    previewTop: null,
  };

  handleAdd = () => {
    const { onAdd, meta, totalModules } = this.props;
    const id = uniqName(meta, totalModules);
    onAdd(id, meta);
  };

  handleMouseEnter = evt => {
    const { isDragging, onPreview, meta, isHovered } = this.props;
    if (!isDragging && !isHovered) {
      const { top } = evt.currentTarget.getBoundingClientRect();
      this.setState({ previewTop: top });
      onPreview(meta.type);
    }
  };

  handleMouseLeave = () => {
    const { isDragging, onPreview } = this.props;
    if (!isDragging) {
      onPreview(null);
    }
  };

  render() {
    const {
      connectDragSource,
      isHovered,
      isDragging,
      meta,
      offset,
    } = this.props;

    const { previewTop } = this.state;

    const classes = cn(styles.container, {
      [styles.dragging]: isDragging,
      [styles.hovered]: isHovered,
    });
    return connectDragSource(
      <div
        className={classes}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={styles.drag}>
          <DragIcon />
        </div>
        <div className={styles.name}>{meta.name}</div>
        {isHovered && (
          <div className={styles.preview} style={{ top: previewTop - offset }}>
            <Icon className={styles.img} alt={meta.name} />
            <button className={styles.add} onClick={this.handleAdd}>
              Add
            </button>
          </div>
        )}
      </div>
    );
  }
}

const collect = (connect, monitor) => ({
  isDragging: monitor.isDragging(),
  connectDragSource: connect.dragSource(),
});

export default DragSource(FORM_DND_ID, metaSource, collect)(ModuleItem);
