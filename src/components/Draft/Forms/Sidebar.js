import React, { useContext } from 'react';

import { EditorContext, Sidebar as UISidebar } from '@expandorg/form-editor';

export default function Sidebar({ children }) {
  const { selection } = useContext(EditorContext);
  return <UISidebar visible={selection.isEmpty()}>{children}</UISidebar>;
}
