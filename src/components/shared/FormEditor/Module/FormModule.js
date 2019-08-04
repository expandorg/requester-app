import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@expandorg/modules';

import DnDContainer from './DnDContainer';

// eslint-disable-next-line import/no-cycle
import Preview from './Preview';
import { EditorContext } from '../EditorContext';

export default function FormModule({ module, selection, path }) {
  const { controlsMap, onMove, onEndDrag } = useContext(EditorContext);
  return (
    <DnDContainer
      path={path}
      module={module}
      controls={controlsMap}
      onMove={onMove}
      onEndDrag={onEndDrag}
    >
      {({ connectDragPreview }) => (
        <Preview
          path={path}
          selection={selection}
          module={module}
          connectDragPreview={connectDragPreview}
        />
      )}
    </DnDContainer>
  );
}

FormModule.propTypes = {
  module: moduleProps.isRequired,
  path: PropTypes.arrayOf(PropTypes.number).isRequired,
  selection: PropTypes.string,
};

FormModule.defaultProps = {
  selection: null,
};
