// @flow
import { useState, useEffect, useRef } from 'react';
import debounce from 'debounce';

export default function useClientRect(dobounceInterval: number = 200) {
  const ref = useRef<?HTMLElement>(null);

  const [rect, setRect] = useState(null);

  const resize = debounce(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
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
