import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as Arrow } from '@expandorg/uikit/assets/arrow-down.svg';
import { VariablesToggle } from '@expandorg/richtext';

import { dataColumnProps } from '../../../shared/propTypes';

import styles from './Column.module.styl';

export default function Column({
  readOnly,
  column: original,
  variables,
  index,
  onChange,
  onToggleVarsDialog,
}) {
  const [column, setColumn] = useState(original);
  const [edit, setEdit] = useState(
    !readOnly && !original.skipped && !original.variable
  );

  useEffect(() => {
    setColumn(original);
  }, [original]);

  const toggle = useCallback(
    evt => {
      evt.preventDefault();
      setEdit(!edit);
      setColumn(original);
    },
    [edit, original]
  );

  const skip = useCallback(
    evt => {
      evt.preventDefault();
      const edited = {
        ...original,
        skipped: !original.skipped,
        variable: original.skipped ? original.variable : '',
      };
      setEdit(false);
      onChange(edited, index, true);
    },
    [index, onChange, original]
  );

  const save = useCallback(
    evt => {
      evt.preventDefault();
      onChange(column, index);
      setEdit(false);
    },
    [column, index, onChange]
  );

  const selectVar = useCallback(
    (_, variable) => {
      setColumn({ ...column, variable });
    },
    [column]
  );

  return (
    <>
      {!edit && (
        <div
          className={cn(styles.container, {
            [styles.skipped]: column.skipped,
            [styles.assigned]: !column.skipped && !!column.variable,
          })}
        >
          <div className={styles.header}>
            <div className={styles.name}>{column.name}</div>
          </div>
          <div className={styles.content}>
            {column.skipped && (
              <div className={styles.warning}>
                This column will not be imported
              </div>
            )}
            {!column.skipped && (
              <div className={styles.variable}>
                {column.variable || '[unmatched variable]'}
              </div>
            )}
          </div>
          {!readOnly && (
            <div className={styles.actions}>
              {!column.skipped && (
                <>
                  <button
                    className={cn(styles.button, styles.edit)}
                    onClick={toggle}
                  >
                    Edit
                  </button>
                  <button
                    className={cn(styles.button, styles.skip)}
                    onClick={skip}
                  >
                    Skip
                  </button>
                </>
              )}
              {column.skipped && (
                <button
                  className={cn(styles.button, styles.skip)}
                  onClick={skip}
                >
                  unskip
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {edit && (
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.name}>{column.name}</div>
          </div>
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
            <button className={cn(styles.button, styles.save)} onClick={save}>
              Save
            </button>
            <button className={cn(styles.button, styles.skip)} onClick={skip}>
              Skip
            </button>
          </div>
        </div>
      )}
    </>
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
