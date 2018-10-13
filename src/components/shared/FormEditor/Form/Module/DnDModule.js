import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { DragSource, DropTarget } from 'react-dnd';

import { moduleProps } from '@gemsorg/modules';

import ModuleEdit from './ModuleEdit';

import { moduleSource, moduleTarget, FORM_DND_ID } from '../../dnd';

import styles from './DnDModule.module.styl';

class DnDModule extends Component {
  static propTypes = {
    module: moduleProps.isRequired,
    order: PropTypes.number.isRequired, // eslint-disable-line
    controls: PropTypes.object.isRequired, // eslint-disable-line

    isDragging: PropTypes.bool.isRequired,
    onMove: PropTypes.func.isRequired, // eslint-disable-line

    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  };

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      module,
      controls,
    } = this.props;

    return connectDragSource(
      connectDropTarget(
        <div
          className={cn(styles.container)}
          ref={c => {
            this.containerRef = c;
          }}
        >
          {isDragging && <div className={styles.placehoder}>Drop here</div>}
          {!isDragging && <ModuleEdit module={module} controls={controls} />}
        </div>
      )
    );
  }
}

export default DropTarget(FORM_DND_ID, moduleTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(
  DragSource(FORM_DND_ID, moduleSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))(DnDModule)
);
