import React from 'react';

import LinkedValueEditor from './LinkedValueEditor';

const stringify = v => {
  if (typeof v === 'string') {
    return v;
  }
  return v
    ? Reflect.ownKeys(v)
        .map(c => `${c}: ${v[c]}`)
        .join(', ')
    : undefined;
};

export default function ImageRegionEditor(props) {
  return (
    <LinkedValueEditor
      stringifyValue={stringify}
      warning="Drag a square onto the image directly."
      {...props}
    />
  );
}

ImageRegionEditor.withModuleProperties = true;
