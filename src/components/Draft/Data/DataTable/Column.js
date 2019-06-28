import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Switch } from '@expandorg/components';
import { ReactComponent as Arrow } from '@expandorg/uikit/assets/arrow-down.svg';

import { ReactComponent as EditIcon } from './edit.svg';

import { dataColumnProps } from '../../../shared/propTypes';
import { VariablesToggle } from '../../../shared/VariablesDropdown';

import styles from './Column.module.styl';

const Header = ({ onEdit, name, readOnly }) => (
  <div className={styles.header}>
    <div className={styles.name}>{name}</div>
    {!readOnly && (
      <button className={styles.edit} onClick={onEdit}>
        <EditIcon />
      </button>
    )}
  </div>
);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default function Column({
  readOnly,
  column: original,
  variables,
  index,
  onChange,
  onToggleVarsDialog,
}) {
  const [edit, setEdit] = useState(false);
  const [column, setColumn] = useState(original);

  useEffect(() => {
    setColumn(original);
    setEdit(false);
  }, [original]);

  const toggleEdit = useCallback(() => {
    setEdit(!edit);
    setColumn(original);
  }, [edit, original]);

  const toggleSkip = useCallback(() => {
    onChange({ ...original, skipped: !original.skipped }, index, true);
  }, [index, onChange, original]);

  const save = useCallback(() => {
    setEdit(false);
    onChange(column, index);
  }, [column, index, onChange]);

  const selectVar = useCallback(
    (_, variable) => {
      setColumn({ ...column, variable });
    },
    [column]
  );

  const classes = cn(styles.container, { [styles.skipped]: column.skipped });
  return (
    <div className={classes}>
      {!edit && (
        <>
          <Header
            name={column.name}
            onEdit={toggleEdit}
            readOnly={readOnly || column.skipped}
          />
          <div className={styles.content}>
            {column.skipped && (
              <div className={styles.warning}>Will not be imported</div>
            )}
            {!column.skipped && (
              <div className={styles.variable}>{column.variable || '--'}</div>
            )}
          </div>
          {!readOnly && (
            <div className={styles.actions}>
              <Switch value={!column.skipped} onChange={toggleSkip} />
            </div>
          )}
        </>
      )}
      {edit && (
        <>
          <Header
            name={column.name}
            onEdit={toggleEdit}
            readOnly={readOnly || column.skipped}
          />
          <div className={styles.content}>
            <div className={styles.input}>
              <VariablesToggle
                className={styles.dropdown}
                variables={variables}
                onSelect={selectVar}
                onToggleVarsDialog={onToggleVarsDialog}
              >
                {({ onToggle }) => (
                  <button className={styles.varsToggle} onClick={onToggle}>
                    {column.variable || 'Select variable'}
                    <Arrow className={styles.arrow} />
                  </button>
                )}
              </VariablesToggle>
            </div>
          </div>
          <div className={styles.actions}>
            <button
              className={cn(styles.button, styles.skip)}
              onClick={toggleEdit}
            >
              Cancel
            </button>
            <button className={cn(styles.button, styles.save)} onClick={save}>
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
}

Column.propTypes = {
  column: dataColumnProps.isRequired,
  variables: PropTypes.arrayOf(PropTypes.string),
  index: PropTypes.number.isRequired,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onToggleVarsDialog: PropTypes.func,
};

Column.defaultProps = {
  variables: [],
  readOnly: false,
  onToggleVarsDialog: null,
};
