import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { FormSelection } from '../forms';
import { draftProps } from '../../../shared/propTypes';

import {
  updateOnboarding,
  updateVariables,
} from '../../../../sagas/draftsSagas';
import DraftOnboarding from '../../../../model/DraftOnboarding';

import Quiz from '../Quiz/Quiz';
import VariablesDialog from './VariablesDialog';

export default function VariablesDialogSwitch({
  visible,
  draft,
  selection,
  onHide,
}) {
  const dispatch = useDispatch();

  const updateGroup = useCallback(
    group => {
      const onboarding = DraftOnboarding.update(draft, group);
      dispatch(updateOnboarding(draft.id, onboarding, true));
    },
    [dispatch, draft]
  );

  const updateVars = useCallback(
    vars => {
      dispatch(updateVariables(draft.id, vars));
      onHide();
    },
    [dispatch, draft.id, onHide]
  );

  if (!visible) {
    return null;
  }

  if (selection.isOnboarding()) {
    return (
      <Quiz
        visible
        group={selection.getOnboardingStep(draft)}
        onUpdate={updateGroup}
        onHide={onHide}
      />
    );
  }
  return (
    <VariablesDialog
      variables={draft.variables}
      onHide={onHide}
      onSave={updateVars}
    />
  );
}

VariablesDialogSwitch.propTypes = {
  visible: PropTypes.bool.isRequired,
  draft: draftProps.isRequired,
  selection: PropTypes.instanceOf(FormSelection).isRequired,
  onHide: PropTypes.func.isRequired,
};

VariablesDialogSwitch.defaultProps = {};
