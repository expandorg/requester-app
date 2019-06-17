import React from 'react';
import PropTypes from 'prop-types';

import useClientRect from './useClientRect';

export default function ClientRectContainer({ className, children }) {
  const [ref, rect] = useClientRect();
  return (
    <div ref={ref} className={className}>
      {children({ rect })}
    </div>
  );
}

ClientRectContainer.propTypes = {
  className: PropTypes.string,
};

ClientRectContainer.defaultProps = {
  className: null,
};
