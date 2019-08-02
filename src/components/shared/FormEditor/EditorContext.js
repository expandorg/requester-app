import React, { createContext } from 'react';
import PropTypes from 'prop-types';

export const EditorContext = createContext();

export function EditorContextProvider({ selection, children }) {
  const ctx = { selection };

  return (
    <EditorContext.Provider value={ctx}>{children}</EditorContext.Provider>
  );
}

EditorContextProvider.propTypes = {
  selection: PropTypes.shape({}),
};

EditorContextProvider.defaultProps = {
  selection: null,
};
