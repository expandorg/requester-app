import React, { createContext, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useSyncedState } from '@expandorg/components';
import { formProps } from '@expandorg/modules';
import { getModuleControlsMap } from '@expandorg/modules/model';

import { TreeEditor, Ops } from './Tree';
import { ValueContextProvider } from './ValueContext';
import useSelection from './useSelection';

export const EditorContext = createContext();

const transform = f => (f && f.modules) || [];

const deselectActions = new Set([Ops.Remove, Ops.Copy, Ops.Edit, Ops.Move]);

export function EditorContextProvider({ children, controls, form, onChange }) {
  const controlsMap = useMemo(() => getModuleControlsMap(controls), [controls]);
  const [modules, setModules] = useSyncedState(form, transform);

  const [
    selection,
    onSelect,
    onDeselect,
    selectedModule,
    onEditSelected,
  ] = useSelection();

  const change = useCallback(
    (changedModules, op) => {
      setModules(changedModules);
      if (!selection.isEmpty() && deselectActions.has(op)) {
        onDeselect();
      }
      if (op !== Ops.Move) {
        onChange({ ...form, modules: changedModules });
      }
    },
    [form, onChange, onDeselect, selection, setModules]
  );

  return (
    <TreeEditor modules={modules} selection={selection} onChange={change}>
      {treeOps => (
        <EditorContext.Provider
          value={{
            ...treeOps,
            selection,
            selectedModule,
            onEditSelected,
            onSelect,
            onDeselect,
            controlsMap,
            modules,
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
