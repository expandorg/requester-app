import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { Dialog, Table as T, Button } from '@expandorg/components';

import Header from '../Header';
import Row from '../Row';

import JsonPreview from './JsonPreview';
import TablePreview from './TablePreview';

import styles from './SelectedRowDialog.module.styl';

export default function SelectedRowDialog({
  onHide,
  response,
  index,
  onNext,
  onPrev,
  count,
  mode: initialMode,
}) {
  const [mode, setMode] = useState(initialMode);

  const next = useCallback(
    evt => {
      evt.preventDefault();
      if (index !== count - 1) {
        onNext();
      }
    },
    [count, index, onNext]
  );

  const prev = useCallback(
    evt => {
      evt.preventDefault();
      if (index !== 0) {
        onPrev();
      }
    },
    [index, onPrev]
  );

  return (
    <Dialog
      visible
      onHide={onHide}
      modalClass={styles.modal}
      contentLabel="selected-row-dialog"
    >
      <div className={styles.content}>
        <T.Table>
          <Header mode={mode} onToggle={setMode} />
          <Row response={response} preview={false} mode={mode} index={index} />
        </T.Table>
        {mode === 'json' && (
          <JsonPreview className={styles.json} value={response.value} />
        )}
        {mode === 'table' && (
          <TablePreview className={styles.table} value={response.value} />
        )}
      </div>
      <div className={styles.actions}>
        <Button theme="secondary" className={styles.back} onClick={prev}>
          Back
        </Button>
        <Button theme="secondary" className={styles.next} onClick={next}>
          Next
        </Button>
      </div>
    </Dialog>
  );
}

SelectedRowDialog.propTypes = {
  response: PropTypes.shape({
    value: PropTypes.array,
  }).isRequired,
  mode: PropTypes.oneOf(['json', 'table']).isRequired,
  index: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};
