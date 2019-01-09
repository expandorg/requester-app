import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { DragSource, DropTarget } from 'react-dnd';

import { ReactComponent as X } from '../../../../assets/x.svg';
import { ReactComponent as Checkmark } from '../../../../assets/checkmark-2.svg';
import { ReactComponent as Warning } from '../../../../assets/warning.svg';

import { STEPS_DND_ID, source, target } from './dnd';

import styles from './Step.module.styl';

class Step extends Component {
  static propTypes = {
    id: PropTypes.string, // eslint-disable-line
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,

    isOnboarding: PropTypes.bool,
    isDragging: PropTypes.bool.isRequired,
    order: PropTypes.number,

    onMove: PropTypes.func, // eslint-disable-line
    onDelete: PropTypes.func,
    onEndDrag: PropTypes.func, // eslint-disable-line

    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  };

  static defaultProps = {
    id: null,
    order: null,
    isOnboarding: true,
    checked: false,
    onMove: null,
    onDelete: null,
    onEndDrag: null,
  };

  handleClick = evt => {
    evt.preventDefault();
    const { order, onSelect } = this.props;
    onSelect(order);
  };

  handleDelete = evt => {
    evt.preventDefault();
    const { order, onDelete } = this.props;
    onDelete(order);
  };

  render() {
    const {
      name,
      checked,
      isOnboarding,
      isDragging,

      connectDragSource,
      connectDropTarget,
      connectDragPreview,
    } = this.props;

    /* eslint-disable jsx-a11y/click-events-have-key-events  */
    /* eslint-disable jsx-a11y/no-static-element-interactions  */
    const classes = cn(styles.outer, {
      [styles.dragging]: isDragging,
    });
    const iconClass = cn(styles.icon, { [styles.checked]: checked });
    return connectDragSource(
      connectDropTarget(
        <div className={classes}>
          {connectDragPreview(
            <div
              className={styles.container}
              onClick={this.handleClick}
              ref={c => {
                this.containerRef = c;
              }}
            >
              <div className={styles.name}>{name}</div>
              <div className={iconClass}>
                {checked ? <Checkmark /> : <Warning />}
              </div>
            </div>
          )}
          {isOnboarding && (
            <button className={styles.remove} onClick={this.handleDelete}>
              <X />
            </button>
          )}
        </div>
      )
    );
  }
}

export default DropTarget(STEPS_DND_ID, target, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(
  DragSource(STEPS_DND_ID, source, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }))(Step)
);
