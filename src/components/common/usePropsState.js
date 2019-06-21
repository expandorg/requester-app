// @flow

import { useState, useEffect } from 'react';

export default function usePropsState(property: any) {
  // $FlowFixMe
  const [v, set] = useState(property);

  useEffect(() => {
    set(property);
  }, [property]);

  return [v, set];
}
