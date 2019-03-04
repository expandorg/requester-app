import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';

function useClientRect(dobounceInterval = 200) {
  const ref = useRef();
  const [rect, setRect] = useState(null);

  const handleResize = debounce(() => {
    setRect(ref.current.getBoundingClientRect());
  }, dobounceInterval);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      handleResize.clear();
      window.removeEventListener('resize', this.getOffset);
    };
  });
  return [ref, rect];
}

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
