import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps, Module } from '@expandorg/modules';

// eslint-disable-next-line import/no-cycle
import Nested from './Nested';
import Outer from './Preview/Outer';
import Header from './Preview/Header';
import Sidepanel from './Preview/Sidepanel';
import NotSupported from './Preview/NotSupported';
import ModuleWrapper from './Preview/ModuleWrapper';

import { supportNesting } from '../modules';
import { treeEditor } from '../Tree';

import styles from './Preview.module.styl';
import { EditorContext } from '../EditorContext';

// const isVisibilityAllowed = module => module.type !== 'submit';
const isCopyAllowed = module => module.type !== 'submit';
const getModulesHeader = meta => meta.editor.properties.modules.caption;

export default function Preview({
  connectDragPreview,
  module,
  selection,
  path,
}) {
  const { onCopy, onRemove, onSelect, controlsMap } = useContext(EditorContext);

  const copy = useCallback(() => {
    onCopy(path, module);
  }, [module, onCopy, path]);

  const remove = useCallback(() => {
    onRemove(path);
  }, [onRemove, path]);

  const select = useCallback(() => {
    onSelect(path, module, 'edit');
  }, [module, onSelect, path]);

  const ControlType = controlsMap[module.type];
  if (!ControlType) {
    return <NotSupported type={module.type} onRemove={remove} />;
  }

  const isSelected = treeEditor.getIdByPath(path) === selection;
  return (
    <Outer>
      {connectDragPreview(
        <div
          className={cn(styles.container, { [styles.selected]: isSelected })}
        >
          <Header module={module} onSelect={select} />
          <ModuleWrapper
            isSelected={isSelected}
            selection={selection}
            module={module}
            onSelect={select}
          >
            {({ values, onChange, module: preview }) => (
              <Module
                isModulePreview
                isSubmitting={false}
                module={preview}
                controls={controlsMap}
                values={values}
                onChange={onChange}
              />
            )}
          </ModuleWrapper>
          {supportNesting(ControlType.module) && (
            <Nested
              title={getModulesHeader(ControlType.module)}
              selection={selection}
              modules={module.modules}
              path={path}
            />
          )}
        </div>
      )}
      <Sidepanel
        nested={path.length > 1}
        canCopy={isCopyAllowed(module)}
        onRemove={remove}
        onCopy={copy}
      />
    </Outer>
  );
}

Preview.propTypes = {
  module: moduleProps.isRequired,
  path: PropTypes.arrayOf(PropTypes.number).isRequired,
  selection: PropTypes.string,

  connectDragPreview: PropTypes.func.isRequired,
};

Preview.defaultProps = {
  selection: null,
};
