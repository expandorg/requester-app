import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DropTarget } from 'react-dnd';

import { moduleProps } from '@expandorg/modules';

import { EmptyDroppable } from './Placeholders';

import DnDContainer from './DnDContainer';

// eslint-disable-next-line import/no-cycle
import Preview from './Preview';

import { nestedModuleTarget, FORM_DND_ID } from '../model/dnd';

import styles from './Nested.module.styl';

class Nested extends Component {
  static propTypes = {
    title: PropTypes.string,
    modules: PropTypes.arrayOf(moduleProps),
    path: PropTypes.arrayOf(PropTypes.number).isRequired,
    controls: PropTypes.object.isRequired, // eslint-disable-line
    selected: PropTypes.string,
    onMove: PropTypes.func.isRequired, // eslint-disable-line
    onSelect: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onCopy: PropTypes.func.isRequired,

    connectDropTarget: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: null,
    modules: null,
    selected: null,
  };

  render() {
    const {
      title,
      connectDropTarget,
      modules,
      selected,
      controls,
      path,
      onMove,
      onRemove,
      onSelect,
      onCopy,
    } = this.props;

    const hasNested = modules && modules.length > 0;

    return connectDropTarget(
      <div className={styles.nested}>
        {hasNested ? (
          modules.map((nestedModule, nestedOrder) => {
            const p = [...path, nestedOrder];
            return (
              <DnDContainer
                key={nestedModule.name}
                controls={controls}
                path={p}
                module={nestedModule}
                onMove={onMove}
              >
                {({ connectDragPreview }) => (
                  <Preview
                    module={nestedModule}
                    path={p}
                    controls={controls}
                    selected={selected}
                    onMove={onMove}
                    onRemove={onRemove}
                    onSelect={onSelect}
                    onCopy={onCopy}
                    connectDragPreview={connectDragPreview}
                  />
                )}
              </DnDContainer>
            );
          })
        ) : (
          <EmptyDroppable
            title={title || 'Drop here'}
            path={path}
            onMove={onMove}
          />
        )}
      </div>
    );
  }
}

export default DropTarget(FORM_DND_ID, nestedModuleTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(Nested);
