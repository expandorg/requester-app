import React, { useContext } from 'react';

import { Sidebar as UISidebar } from '../../shared/FormEditor/Layout';
import { EditorContext } from '../../shared/FormEditor/EditorContext';

export default function Sidebar({ children }) {
  const { selection } = useContext(EditorContext);
  return <UISidebar visible={selection.isEmpty()}>{children}</UISidebar>;
}
