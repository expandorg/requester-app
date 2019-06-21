import React, { useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Steps from './Steps/Steps';

import { makeDataColumnNamesSelector } from '../../../../selectors/dataSelectors';
import { fetch as fetchData } from '../../../../sagas/dataSagas';
import {
  updateTaskForm,
  updateOnboarding,
  updateVerificationForm,
} from '../../../../sagas/draftsSagas';
import { draftProps } from '../../../shared/propTypes';

import Editor from './Editor';
import Toolbar from './Toolbar/Toolbar';

import { FormSelection, FormProps } from './forms';
import DraftOnboarding from '../../../../model/DraftOnboarding';

export default function JobForms({ draft, onNext }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (draft.dataId) {
      dispatch(fetchData(draft.id, draft.dataId, 0));
    }
  }, [dispatch, draft.dataId, draft.id]);

  const dataColumnsSelector = useMemo(makeDataColumnNamesSelector, []);
  const dataColumns = useSelector(state =>
    dataColumnsSelector(state, draft.dataId)
  );
  const [selection, setSelection] = useState(FormSelection.task);

  const saveTask = useCallback(
    form => {
      dispatch(updateTaskForm(draft.id, form));
    },
    [dispatch, draft.id]
  );

  const saveVerification = useCallback(
    form => {
      dispatch(updateVerificationForm(draft.id, form));
    },
    [dispatch, draft.id]
  );

  const saveOnboarding = useCallback(
    form => {
      const onboarding = DraftOnboarding.updateForm(
        draft,
        selection.step,
        form
      );
      dispatch(updateOnboarding(draft.id, onboarding));
    },
    [dispatch, draft, selection]
  );

  const save = FormProps.getUpdateAction(
    selection,
    saveTask,
    saveVerification,
    saveOnboarding
  );

  return (
    <Editor
      form={selection.getForm(draft)}
      onSave={save}
      toolbar={<Toolbar draft={draft} onNext={onNext} />}
      {...FormProps.getFormProps(selection, dataColumns)}
    >
      <Steps selection={selection} draft={draft} onSelect={setSelection} />
    </Editor>
  );
}

JobForms.propTypes = {
  draft: draftProps.isRequired,
  onNext: PropTypes.func.isRequired,
};
