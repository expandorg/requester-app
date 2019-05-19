import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { InputValueContext } from '../../InputValueContext';
import { treeEditor } from '../../../model/dnd';

import styles from './ModuleWrapper.module.styl';

export default function ModuleWrapper({
  children,
  name,
  path,
  selected,
  onSelect,
}) {
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  /* eslint-disable jsx-a11y/click-events-have-key-events */
  return (
    <InputValueContext.Consumer>
      {({ isValueEditable, moduleValue, onChangeValue }) => {
        const isSelected = treeEditor.getIdByPath(path) === selected;
        const editable = isSelected && isValueEditable;
        const dimmed = selected !== null && !isSelected;

        return (
          <div className={cn(styles.inner, { [styles.dimmed]: dimmed })}>
            {children({
              values: editable ? { [name]: moduleValue } : undefined,
              onChange: editable ? onChangeValue : undefined,
            })}
            {!editable && <div className={styles.edit} onClick={onSelect} />}
          </div>
        );
      }}
    </InputValueContext.Consumer>
  );
}

ModuleWrapper.propTypes = {
  path: PropTypes.arrayOf(PropTypes.number).isRequired,
  selected: PropTypes.string,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

ModuleWrapper.defaultProps = {
  selected: null,
};
