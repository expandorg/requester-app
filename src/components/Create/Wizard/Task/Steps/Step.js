import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { DragSource, DropTarget } from 'react-dnd';

import { ReactComponent as Checkmark } from '../../../../assets/checkmark-2.svg';
import { ReactComponent as Warning } from '../../../../assets/warning.svg';

import { STEPS_DND_ID, source, target } from './dnd';

import styles from './Step.module.styl';

class Step extends Component {
  static propTypes = {
    step: PropTypes.object.isRequired, // eslint-disable-line
    onSelect: PropTypes.func.isRequired,

    isTask: PropTypes.bool.isRequired,  // eslint-disable-line
    isDragging: PropTypes.bool.isRequired,
    order: PropTypes.number.isRequired, // eslint-disable-line
    onMove: PropTypes.func.isRequired, // eslint-disable-line

    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  };

  handleClick = evt => {
    evt.preventDefault();
    const { step, onSelect } = this.props;
    onSelect(step.id);
  };

  render() {
    const {
      step,
      connectDragSource,
      connectDropTarget,
      isDragging,
    } = this.props;

    /* eslint-disable jsx-a11y/click-events-have-key-events  */
    /* eslint-disable jsx-a11y/no-static-element-interactions  */

    return connectDragSource(
      connectDropTarget(
        <div
          className={cn(styles.container, { [styles.dragging]: isDragging })}
          onClick={this.handleClick}
          ref={c => {
            this.containerRef = c;
          }}
        >
          <div className={styles.name}>{step.name}</div>
          <div className={cn(styles.icon, { [styles.checked]: step.checked })}>
            {step.checked ? <Checkmark /> : <Warning />}
          </div>
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
    isDragging: monitor.isDragging(),
  }))(Step)
);
