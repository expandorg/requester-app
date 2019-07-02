import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps } from '@expandorg/modules';

import { ValueContext } from '../../ValueContext';
import { treeEditor } from '../../Tree';

import styles from './ModuleWrapper.module.styl';

const overrideReadonly = module => {
  if (module.readOnly) {
    const { readOnly, ...rest } = module;
    return rest;
  }
  return module;
};

export default function ModuleWrapper({
  children,
  path,
  selected,
  onSelect,
  module,
}) {
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  /* eslint-disable jsx-a11y/click-events-have-key-events */
  return (
    <ValueContext.Consumer>
      {({ isValueEditable, moduleValues, onChangeValue }) => {
        const isSelected = treeEditor.getIdByPath(path) === selected;
        const editable = isSelected && isValueEditable;
        const dimmed = selected !== null && !isSelected;
        return (
          <div className={cn(styles.inner, { [styles.dimmed]: dimmed })}>
            {children({
              module: editable ? overrideReadonly(module) : module,
              values: editable ? moduleValues : undefined,
              onChange: editable ? onChangeValue : undefined,
            })}
            {!editable && <div className={styles.edit} onClick={onSelect} />}
          </div>
        );
      }}
    </ValueContext.Consumer>
  );
}

ModuleWrapper.propTypes = {
  path: PropTypes.arrayOf(PropTypes.number).isRequired,
  module: moduleProps.isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

ModuleWrapper.defaultProps = {
  selected: null,
};
