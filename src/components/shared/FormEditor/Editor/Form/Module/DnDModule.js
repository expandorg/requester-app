import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { DragSource, DropTarget } from 'react-dnd';

import { moduleProps, Module } from '@gemsorg/modules';

import { ReactComponent as X } from '../../../../../assets/x.svg';

import Placeholder from './Placeholder';
import NestedModules from './NestedModules';
import { supportNesting } from '../../../modules';

import { moduleSource, moduleTarget, FORM_DND_ID } from '../../../dnd';

import styles from './DnDModule.module.styl';

class DnDModule extends Component {
  static propTypes = {
    module: moduleProps.isRequired,
    path: PropTypes.arrayOf(PropTypes.number).isRequired,
    controls: PropTypes.object.isRequired, // eslint-disable-line
    isDragging: PropTypes.bool.isRequired,
    dimmed: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    onMove: PropTypes.func.isRequired, // eslint-disable-line
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,

    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  };

  handleEditClick = evt => {
    const { onEdit, path } = this.props;
    onEdit(path);

    evt.preventDefault();
  };

  handleRemoveClick = evt => {
    const { onRemove, path } = this.props;
    onRemove(path);
    evt.preventDefault();
  };

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      connectDragPreview,
      dimmed,
      selected,
      isDragging,
      module,
      controls,
      path,
      onMove,
      onRemove,
      onEdit,
    } = this.props;

    const { module: meta } = controls[module.type];

    const dragging = isDragging || module.isDragging;

    const classes = cn(styles.container, {
      [styles.dimmed]: dimmed,
      [styles.selected]: selected,
    });

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */

    return connectDragSource(
      connectDropTarget(
        <div
          className={styles.dndContainer}
          ref={c => {
            this.containerRef = c;
          }}
        >
          {!dragging ? (
            <div className={styles.outer}>
              {connectDragPreview(
                <div className={classes}>
                  <div className={styles.inner}>
                    <Module
                      module={module}
                      isSubmitting={false}
                      controls={controls}
                    />
                    <div
                      className={styles.edit}
                      onClick={this.handleEditClick}
                    />
                  </div>
                  {supportNesting(meta) && (
                    <NestedModules
                      modules={module.modules}
                      path={path}
                      controls={controls}
                      selected={selected}
                      onMove={onMove}
                      onEdit={onEdit}
                      onRemove={onRemove}
                    />
                  )}
                </div>
              )}
              {path.length === 1 && (
                <button
                  className={styles.remove}
                  onClick={this.handleRemoveClick}
                >
                  <X />
                </button>
              )}
            </div>
          ) : (
            <Placeholder className={styles.placeholder} />
          )}
        </div>
      )
    );
  }
}

const DndContainer = DropTarget(FORM_DND_ID, moduleTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(
  DragSource(FORM_DND_ID, moduleSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }))(DnDModule)
);

export default DndContainer;
