import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { deferComponentRender } from '@expandorg/components';
import Steps from './Steps/Steps';

import useToggle from '../../common/useToggle';

import {
  updateTaskForm,
  updateOnboarding,
  updateVerificationForm,
} from '../../../sagas/draftsSagas';
import { draftProps } from '../../shared/propTypes';

import Editor from './Editor';
import Toolbar from './Toolbar/Toolbar';
import VariablesDialogSwitch from './Variables/VariablesDialogSwitch';

import { FormSelection, FormProps } from './forms';

import DraftOnboarding from '../../../model/DraftOnboarding';

function JobForms({ draft, onNext, validation }) {
  const dispatch = useDispatch();

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

  const [varsDialog, toggleVars] = useToggle();

  const save = FormProps.getUpdateAction(
    selection,
    saveTask,
    saveVerification,
    saveOnboarding
  );

  const varParams = FormProps.getVariablesParams(selection, draft, toggleVars);

  return (
    <Editor
      form={selection.getForm(draft)}
      onSave={save}
      toolbar={<Toolbar draft={draft} onNext={onNext} />}
      {...varParams}
    >
      <Steps
        draft={draft}
        selection={selection}
        validation={validation}
        onSelect={setSelection}
      />
      <VariablesDialogSwitch
        visible={varsDialog}
        selection={selection}
        draft={draft}
        onHide={toggleVars}
      />
    </Editor>
  );
}

JobForms.propTypes = {
  draft: draftProps.isRequired,
  validation: PropTypes.shape({}).isRequired,
  onNext: PropTypes.func.isRequired,
};

export default deferComponentRender(JobForms);
