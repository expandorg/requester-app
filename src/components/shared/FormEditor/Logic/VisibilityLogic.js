import React from 'react';

import { moduleProps } from '@expandorg/modules';

export default function VisibilityLogic({ module }) {
  console.log(module);

  return <div>test</div>;
}

VisibilityLogic.propTypes = {
  module: moduleProps.isRequired,
};
