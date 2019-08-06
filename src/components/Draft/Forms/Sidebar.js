import React, { useContext } from 'react';

import { EditorContext } from '../../shared/FormEditor';
import { Sidebar as UISidebar } from '../../shared/FormEditor/Layout';

export default function Sidebar({ children }) {
  const { selection } = useContext(EditorContext);
  return <UISidebar visible={selection.isEmpty()}>{children}</UISidebar>;
}
