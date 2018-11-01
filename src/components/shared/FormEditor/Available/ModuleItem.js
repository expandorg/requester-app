import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { DragSource } from 'react-dnd';

import PreviewTooltip from './PreviewTooltip';

import { metaSource, FORM_DND_ID } from '../dnd';

import { ReactComponent as DragIcon } from '../../../assets/dragcursor.svg';
import { ReactComponent as InfoMark } from '../../../assets/i.svg';

import styles from './ModuleItem.module.styl';

class ModuleItem extends Component {
  static propTypes = {
    meta: PropTypes.shape({
      type: PropTypes.string,
    }).isRequired,
    isDragging: PropTypes.bool.isRequired,
    offset: PropTypes.number.isRequired,
    isHovered: PropTypes.bool.isRequired,
    onEndDrag: PropTypes.func.isRequired, // eslint-disable-line
    onAdd: PropTypes.func.isRequired,
    onPreview: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
  };

  state = {
    previewTop: null,
  };

  handleAdd = () => {
    const { onAdd, meta } = this.props;
    onAdd(meta);
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
    });

    /* eslint-disable jsx-a11y/click-events-have-key-events  */
    /* eslint-disable jsx-a11y/no-static-element-interactions  */

    return connectDragSource(
      <div className={classes} onClick={this.handleAdd}>
        <div className={styles.drag}>
          <DragIcon className={styles.dragIcon} />
        </div>
        <div className={styles.name}>{meta.name}</div>
        <div
          className={cn(styles.info, { [styles.markHover]: isHovered })}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <InfoMark className={styles.mark} />
          {isHovered && <PreviewTooltip top={previewTop - offset} />}
        </div>
      </div>
    );
  }
}

const collect = (connect, monitor) => ({
  isDragging: monitor.isDragging(),
  connectDragSource: connect.dragSource(),
});

export default DragSource(FORM_DND_ID, metaSource, collect)(ModuleItem);
