import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';

function useClientRect(dobounceInterval = 200) {
  const ref = useRef();
  const [rect, setRect] = useState(null);

  const resize = debounce(() => {
    setRect(ref.current.getBoundingClientRect());
  }, dobounceInterval);

  useEffect(() => {
    window.addEventListener('resize', resize);
    resize();
    return () => {
      resize.clear();
      window.removeEventListener('resize', resize);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
