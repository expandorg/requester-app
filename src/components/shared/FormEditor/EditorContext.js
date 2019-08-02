import React, { createContext, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { getModuleControlsMap } from '@expandorg/modules/model';

import validateModuleProperties from './Properties/validateModuleProperties';

export const EditorContext = createContext();

export function EditorContextProvider({
  controls,
  selection,
  children,
  getModules,
}) {
  const controlsMap = useMemo(() => getModuleControlsMap(controls), [controls]);

  const onValidateModule = useCallback(
    (module, originalName) => {
      const modules = getModules();
      const { module: meta } = controlsMap[module.type];
      return validateModuleProperties(module, originalName, meta, modules);
    },
    [controlsMap, getModules]
  );

  const ctx = { selection, controlsMap, onValidateModule };

  return (
    <EditorContext.Provider value={ctx}>{children}</EditorContext.Provider>
  );
}

EditorContextProvider.propTypes = {
  selection: PropTypes.shape({}),
  controls: PropTypes.arrayOf(PropTypes.func).isRequired,
  getModules: PropTypes.func.isRequired,
};

EditorContextProvider.defaultProps = {
  selection: null,
};
