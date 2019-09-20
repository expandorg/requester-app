import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { deferComponentRender, useToggle } from '@expandorg/components';

import Steps from './Steps/Steps';

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

function JobForms({ draft, onNext, tab }) {
  const dispatch = useDispatch();

  const [selection, setSelection] = useState(FormSelection.task);

  useEffect(() => {
    if (tab) {
      setSelection(tab);
    }
  }, [tab]);

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
      formId={selection.getFormId()}
      onSave={save}
      toolbar={<Toolbar draft={draft} onNext={onNext} />}
      pickerModules={FormProps.getPickerModules(selection)}
      {...varParams}
    >
      <Steps draft={draft} selection={selection} onSelect={setSelection} />
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
  tab: PropTypes.instanceOf(FormSelection),
  onNext: PropTypes.func.isRequired,
};

JobForms.defaultProps = {
  tab: null,
};

export default deferComponentRender(JobForms);
