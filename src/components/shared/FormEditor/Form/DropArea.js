import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { useDrop } from 'react-dnd';
import { dropAreaTarget } from '../dnd';

export default function DropArea({ onAdd, children, className }) {
  const ref = useRef();
  const [, drop] = useDrop(dropAreaTarget(onAdd));
  return (
    <div className={className} ref={drop(ref)}>
      {children}
    </div>
  );
}

DropArea.propTypes = {
  className: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
};
