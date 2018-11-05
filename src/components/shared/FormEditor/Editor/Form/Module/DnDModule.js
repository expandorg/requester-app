import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { DragSource, DropTarget } from 'react-dnd';

import { moduleProps, Module } from '@gemsorg/modules';

import { ReactComponent as X } from '../../../../../assets/x.svg';

import Placeholder from './Placeholder';

import {
  moduleSource,
  nestedTarget,
  moduleTarget,
  FORM_DND_ID,
} from '../../../dnd';

import styles from './DnDModule.module.styl';

const EmptyDroppable = DropTarget(FORM_DND_ID, nestedTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(Placeholder);

class DnDModule extends Component {
  static propTypes = {
    module: moduleProps.isRequired,
    path: PropTypes.arrayOf(PropTypes.number).isRequired,
    controls: PropTypes.object.isRequired, // eslint-disable-line
    isOver: PropTypes.bool.isRequired,
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
      isOver,
      onRemove,
      onEdit,
    } = this.props;

    const {
      module: {
        editor: { properties },
      },
    } = controls[module.type];

    const dragging = isDragging || module.isDragging;

    const classes = cn(styles.container, {
      [styles.dimmed]: dimmed,
      [styles.selected]: selected,
      [styles.over]: isOver,
    });

    const supportNested = !!(properties && properties.modules);
    const hasNested = module.modules && module.modules.length > 0;

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
                  {supportNested && (
                    <div className={styles.nested}>
                      {hasNested ? (
                        module.modules.map((nestedModule, nestedOrder) => (
                          <DndContainer
                            key={nestedModule.name}
                            path={[...path, nestedOrder]}
                            module={nestedModule}
                            controls={controls}
                            dimmed={
                              selected !== null &&
                              nestedModule.name !== selected
                            }
                            selected={
                              selected !== null &&
                              nestedModule.name === selected
                            }
                            onMove={onMove}
                            onRemove={onRemove}
                            onEdit={onEdit}
                          />
                        ))
                      ) : (
                        <EmptyDroppable path={path} onMove={onMove} />
                      )}
                    </div>
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

const DndContainer = DropTarget(
  FORM_DND_ID,
  moduleTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
  })
)(
  DragSource(FORM_DND_ID, moduleSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }))(DnDModule)
);

export default DndContainer;
