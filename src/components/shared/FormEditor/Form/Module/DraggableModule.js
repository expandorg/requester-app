import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { DragSource } from 'react-dnd';

import ModuleEdit from './ModuleEdit';

import { sourceModule, FORM_DND_ID } from '../../dnd';

import styles from './styles.module.styl';

class DraggableModule extends Component {
  static propTypes = {
    className: PropTypes.string,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { connectDragSource, isDragging, className, ...rest } = this.props;
    return connectDragSource(
      <div
        className={cn({ [styles.dragging]: isDragging })}
        style={{ opacity: isDragging ? 0 : 1 }}
      >
        <ModuleEdit className={className} {...rest} />
      </div>
    );
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

export default DragSource(FORM_DND_ID, sourceModule, collect)(DraggableModule);
