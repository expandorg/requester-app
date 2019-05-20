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

export default function TimelineRangeEditor(props) {
  return (
    <LinkedValueEditor
      stringifyValue={stringify}
      warning="Drag a range onto the timeline."
      {...props}
    />
  );
}

TimelineRangeEditor.withModuleProperties = true;
