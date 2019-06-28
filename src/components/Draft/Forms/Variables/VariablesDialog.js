import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { Dialog, Button, DialogForm as DF, Input } from '@expandorg/components';

import { updateVariables } from '../../../../sagas/draftsSagas';

import styles from './VariablesDialog.module.styl';

export default function VariablesDialog({ onHide, draftId, variables }) {
  const dispatch = useDispatch();

  const [vars, setVars] = useState(variables);
  const [value, setValue] = useState('');

  const save = useCallback(() => {
    dispatch(updateVariables(draftId, vars));
    onHide();
  }, [dispatch, draftId, onHide, vars]);

  const add = useCallback(() => {
    if (value) {
      setVars([...new Set([value, ...vars])]);
      setValue('');
    }
  }, [value, vars]);

  const remove = useCallback(
    val => {
      setVars(vars.filter(v => v !== val));
    },
    [vars]
  );

  const hasVars = vars.length !== 0;

  return (
    <Dialog
      visible
      modalClass={styles.modal}
      overlayClass={styles.overlay}
      contentLabel="verification-dialog"
      onHide={onHide}
    >
      <DF.Container className={styles.container}>
        <DF.Title>Variables</DF.Title>
        <div className={styles.fieldset}>
          <div className={styles.field}>
            <Input
              value={value}
              className={styles.input}
              placeholder="Create variable tag"
              onChange={({ target }) => setValue(target.value)}
            />
            <button className={styles.add} onClick={add}>
              add
            </button>
          </div>
          <div className={styles.vars}>
            <div className={styles.desc}>Variables List</div>
            {hasVars && (
              <div className={styles.list}>
                {vars.map(v => (
                  <div key={v} className={styles.variable}>
                    <div key={v} className={styles.name}>
                      {v}
                    </div>
                    <button className={styles.remove} onClick={() => remove(v)}>
                      {' '}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <DF.Actions>
          <Button className={styles.btn} theme="secondary" onClick={onHide}>
            go back
          </Button>
          <Button className={styles.btn} onClick={save}>
            Save
          </Button>
        </DF.Actions>
      </DF.Container>
    </Dialog>
  );
}

VariablesDialog.propTypes = {
  variables: PropTypes.arrayOf(PropTypes.string),
  draftId: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
};

VariablesDialog.defaultProps = {
  variables: [],
};
