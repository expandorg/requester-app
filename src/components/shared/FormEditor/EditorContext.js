import React, {
  createContext,
  useMemo,
  useCallback,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';

import { formProps } from '@expandorg/modules';
import { getModuleControlsMap } from '@expandorg/modules/model';

import {
  TreeEditor,
  Ops,
  useSelection,
  useTreeOpsPubSub,
  useCollapsing,
} from './Tree';
import { ValueContextProvider } from './ValueContext';

export const EditorContext = createContext();

const transform = f => (f && f.modules) || [];

const deselectActions = new Set([Ops.Remove, Ops.Copy, Ops.Edit, Ops.Move]);

export function EditorContextProvider({ children, controls, form, onChange }) {
  const controlsMap = useMemo(() => getModuleControlsMap(controls), [controls]);

  const notifyTreeOp = useTreeOpsPubSub();
  const [collapsedMap, onToggleCollapse] = useCollapsing();

  const [
    selection,
    onSelect,
    onDeselect,
    selectedModule,
    onEditSelected,
  ] = useSelection();

  const [modules, setModules] = useState(transform(form));

  useEffect(() => {
    setModules(transform(form));
    onDeselect();
  }, [form, onDeselect]);

  const change = useCallback(
    (changedModules, op) => {
      setModules(changedModules);
      notifyTreeOp(op);
      if (!selection.isEmpty() && deselectActions.has(op)) {
        onDeselect();
      }
      if (op !== Ops.Move) {
        onChange({ ...form, modules: changedModules });
      }
    },
    [form, notifyTreeOp, onChange, onDeselect, selection, setModules]
  );

  return (
    <TreeEditor modules={modules} selection={selection} onChange={change}>
      {treeOps => (
        <EditorContext.Provider
          value={{
            ...treeOps,
            selection,
            selectedModule,
            controlsMap,
            modules,
            collapsedMap,
            onEditSelected,
            onSelect,
            onDeselect,
            onToggleCollapse,
          }}
        >
          <ValueContextProvider selection={selection}>
            {children}
          </ValueContextProvider>
        </EditorContext.Provider>
      )}
    </TreeEditor>
  );
}

EditorContextProvider.propTypes = {
  form: formProps,
  controls: PropTypes.arrayOf(PropTypes.func).isRequired,
  onChange: PropTypes.func.isRequired,
};

EditorContextProvider.defaultProps = {
  form: null,
};
