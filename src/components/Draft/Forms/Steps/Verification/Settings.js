import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import {
  Dialog,
  Button,
  Input,
  Dropdown,
  DialogForm as DF,
} from '@expandorg/components';

import { RequestStates, SubmitStateEffect } from '@expandorg/app-utils';

import { Field, Fieldset } from '../../../controls';
import { draftProps } from '../../../../shared/propTypes';
import { VerificationType } from '../../../../../model/enums';

import { updateDraftVerificationStateSelector } from '../../../../../selectors/uiStateSelectors';
import { updateVerificationSettings } from '../../../../../sagas/draftsSagas';

import styles from './Settings.module.styl';

const options = [
  { value: VerificationType.Requester, label: 'Manual: Verify it yourself' },
  {
    value: VerificationType.Consensus,
    label: 'Consensus',
  },
  // { value: VerificationType.AuditWhitelist, label: 'Whitelist' },
];

const getInitialState = draft => {
  const { verification } = draft;
  return {
    verificationModule: verification.module || VerificationType.Requester,
    agreementCount: `${verification.agreementCount || ''}`,
  };
};

const getSettings = settings => ({
  ...settings,
  agreementCount: +settings.agreementCount,
});

export default function VerificationSettings({ onHide, onSaved, draft }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState(getInitialState(draft));

  useEffect(() => {
    setForm(getInitialState(draft));
  }, [draft]);

  const requestState = useSelector(updateDraftVerificationStateSelector);
  const isSubmitting = requestState.state === RequestStates.Fetching;

  const save = useCallback(() => {
    if (isSubmitting) {
      return;
    }
    dispatch(updateVerificationSettings(draft.id, getSettings(form)));
  }, [dispatch, draft.id, form, isSubmitting]);

  return (
    <Dialog
      visible
      modalClass={styles.modal}
      overlayClass={styles.overlay}
      contentLabel="verification-dialog"
      onHide={onHide}
    >
      <DF.Container className={styles.container}>
        <DF.Title>Verification Settings</DF.Title>
        <Fieldset className={styles.fieldset}>
          <Field>
            <Dropdown
              value={form.verificationModule}
              label="Verification Type"
              options={options}
              onChange={value =>
                setForm({ ...form, verificationModule: value })
              }
            />
          </Field>
          {form.verificationModule === VerificationType.Consensus && (
            <Field
              tooltip={
                <span>
                  Enter how many workers need to get the right answer before the
                  task is verified.
                </span>
              }
            >
              <Input
                placeholder="Agreement count"
                value={form.agreementCount}
                onChange={({ target }) =>
                  setForm({ ...form, agreementCount: target.value })
                }
              />
            </Field>
          )}
        </Fieldset>
        <DF.Actions>
          <Button className={styles.btn} theme="secondary" onClick={onHide}>
            go back
          </Button>
          <Button className={styles.btn} onClick={save}>
            Save
          </Button>
        </DF.Actions>
      </DF.Container>
      <SubmitStateEffect submitState={requestState} onComplete={onSaved} />
    </Dialog>
  );
}

VerificationSettings.propTypes = {
  draft: draftProps.isRequired,
  onSaved: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};
