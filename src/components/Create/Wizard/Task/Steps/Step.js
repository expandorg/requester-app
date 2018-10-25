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
    step: PropTypes.object.isRequired, // eslint-disable-line
    onSelect: PropTypes.func.isRequired,

    isTask: PropTypes.bool.isRequired,
    isDragging: PropTypes.bool.isRequired,
    order: PropTypes.number.isRequired, // eslint-disable-line
    onMove: PropTypes.func.isRequired, // eslint-disable-line
    onDelete: PropTypes.func.isRequired,

    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  };

  handleClick = evt => {
    evt.preventDefault();
    const { step, onSelect } = this.props;
    onSelect(step.id);
  };

  handleDeleteClick = evt => {
    evt.preventDefault();
    const { step, onDelete } = this.props;
    onDelete(step.id);
  };

  render() {
    const {
      step,
      isTask,
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
    const iconClass = cn(styles.icon, { [styles.checked]: step.checked });
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
              <div className={styles.name}>{step.name}</div>
              <div className={iconClass}>
                {step.checked ? <Checkmark /> : <Warning />}
              </div>
            </div>
          )}
          {!isTask && (
            <button className={styles.remove} onClick={this.handleDeleteClick}>
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
