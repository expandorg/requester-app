import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useDrop } from 'react-dnd';

import { moduleProps } from '@expandorg/modules';

import { EmptyDroppable } from './Placeholders';

import DnDContainer from './DnDContainer';

// eslint-disable-next-line import/no-cycle
import Preview from './Preview';

import { nestedModuleTarget } from '../dnd';

import styles from './Nested.module.styl';

export default function Nested({
  title,
  modules,
  selection,
  controls,
  path,
  onMove,
  onRemove,
  onSelect,
  onEndDrag,
  onCopy,
}) {
  const ref = useRef(null);
  const [, drop] = useDrop(nestedModuleTarget);

  const hasNested = modules && modules.length > 0;

  return (
    <div className={styles.nested} ref={drop(ref)}>
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
              onEndDrag={onEndDrag}
            >
              {({ connectDragPreview }) => (
                <Preview
                  module={nestedModule}
                  path={p}
                  controls={controls}
                  selection={selection}
                  onMove={onMove}
                  onRemove={onRemove}
                  onSelect={onSelect}
                  onCopy={onCopy}
                  onEndDrag={onEndDrag}
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

Nested.propTypes = {
  title: PropTypes.string,
  modules: PropTypes.arrayOf(moduleProps),
  path: PropTypes.arrayOf(PropTypes.number).isRequired,
  controls: PropTypes.shape({}).isRequired,
  selection: PropTypes.string,
  onMove: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onEndDrag: PropTypes.func.isRequired,
};

Nested.defaultProps = {
  title: null,
  modules: null,
  selection: null,
};
