import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps } from '@expandorg/modules';

import { ValueContext } from '../../ValueContext';

import styles from './ModuleWrapper.module.styl';
import { EditorContext } from '../../EditorContext';

const overrideReadonly = module => {
  if (module.readOnly) {
    const { readOnly, ...rest } = module;
    return rest;
  }
  return module;
};

export default function ModuleWrapper({
  children,
  visible,
  selection,
  isSelected,
  onSelect,
  module: originalModule,
}) {
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  /* eslint-disable jsx-a11y/click-events-have-key-events */

  const { selectedModule } = useContext(EditorContext);

  const { isValueEditable, moduleValues, onChangeValue } = useContext(
    ValueContext
  );

  if (!visible) {
    return null;
  }

  const module = isSelected ? selectedModule : originalModule;
  const editable = isSelected && isValueEditable;
  return (
    <div
      data-moduleId={module.name}
      className={cn(styles.inner, {
        [styles.dimmed]: selection !== null && !isSelected,
      })}
    >
      {children({
        module: editable ? overrideReadonly(module) : module,
        values: editable ? moduleValues : undefined,
        onChange: editable ? onChangeValue : undefined,
      })}
      {!editable && <div className={styles.edit} onClick={onSelect} />}
    </div>
  );
}

ModuleWrapper.propTypes = {
  visible: PropTypes.bool.isRequired,
  module: moduleProps.isRequired,
  isSelected: PropTypes.bool.isRequired,
  selection: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

ModuleWrapper.defaultProps = {
  selection: null,
};
