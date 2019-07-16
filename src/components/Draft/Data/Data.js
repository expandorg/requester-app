import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@expandorg/components';
import { RequestStates } from '@expandorg/app-utils';

import UploadForm from './CSV/UploadForm';
import Table from './CSV/Table';

import API from './API';
import ConfirmationDialog from '../../shared/ConfirmationDialog';
import { Form, Actions, Description } from '../controls';

import { draftProps } from '../../shared/propTypes';
import { removeData } from '../../../sagas/dataSagas';
import { removeDataStateSelector } from '../../../selectors/uiStateSelectors';
import DraftValidator from '../../../model/DraftValidator';

import styles from './Data.module.styl';

export default function Data({ draft, onBack, onNext }) {
  const dispatch = useDispatch();

  const [tab, setTab] = useState(0);
  const [dialog, setDialog] = useState(false);
  const removeState = useSelector(removeDataStateSelector);

  const hasData = DraftValidator.hasData(draft);

  const toggle = useCallback(
    evt => {
      if (evt) {
        evt.preventDefault();
      }
      setDialog(!dialog);
    },
    [dialog]
  );

  const confirm = useCallback(() => {
    if (removeState.state !== RequestStates.Fetching) {
      dispatch(removeData(draft.id));
      setDialog(false);
    }
  }, [dispatch, draft.id, removeState.state]);

  return (
    <Form>
      <div>
        <Description>
          Upload your dataset (Optional). You can read more about alternative
          ways to supply data&nbsp;
          <a
            className={styles.link}
            href="https://expandorg.zendesk.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
        </Description>
        <div className={styles.tabs}>
          <button
            className={cn(styles.tab, { [styles.tabActive]: !tab })}
            type="button"
            onClick={() => setTab(0)}
          >
            CSV
          </button>
          <button
            className={cn(styles.tab, { [styles.tabActive]: tab })}
            type="button"
            onClick={() => setTab(1)}
          >
            API
          </button>
        </div>
        {tab === 0 && (
          <>
            {!hasData && <UploadForm draft={draft} />}
            {hasData && <Table draft={draft} />}
          </>
        )}
        {tab === 1 && <API draft={draft} />}
      </div>
      <Actions className={styles.actions}>
        <div>
          {hasData && (
            <Button className={styles.delete} onClick={toggle}>
              Remove data
            </Button>
          )}
        </div>
        <div className={styles.btns}>
          <Button theme="secondary" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext}>Next</Button>
        </div>
      </Actions>
      {dialog && (
        <ConfirmationDialog
          title="You are about to remove your data."
          confirmation="Are you sure you want to continue?"
          onHide={toggle}
          onConfirm={confirm}
        />
      )}
    </Form>
  );
}

Data.propTypes = {
  draft: draftProps.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
