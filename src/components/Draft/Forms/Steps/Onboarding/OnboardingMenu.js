import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { draftProps } from '../../../../shared/propTypes';
import { updateOnboarding } from '../../../../../sagas/draftsSagas';
import DraftOnboarding from '../../../../../model/DraftOnboarding';
import { FormSelection } from '../../forms';

import MenuItem from './MenuItem';

import { replace } from './dnd';

const getSteps = draft => (draft.onboarding && draft.onboarding.steps) || [];

export default function OnboardingMenu({ draft, selection, onSelect }) {
  const dispatch = useDispatch();

  const [steps, setSteps] = useState(getSteps(draft));

  useEffect(() => {
    setSteps(getSteps(draft));
  }, [draft]);

  const remove = useCallback(
    id => {
      if (selection.isOnboardingStep(id)) {
        onSelect(FormSelection.task);
      }
      const onboarding = DraftOnboarding.remove(draft, id);
      dispatch(updateOnboarding(draft.id, onboarding));
    },
    [dispatch, draft, onSelect, selection]
  );

  const move = useCallback(
    (dragIndex, hoverIndex) => setSteps(replace(steps, dragIndex, hoverIndex)),
    [steps]
  );

  const update = useCallback(
    (updatedStep, optimistic) => {
      const onboarding = DraftOnboarding.update(draft, updatedStep);
      dispatch(updateOnboarding(draft.id, onboarding, optimistic));
    },
    [dispatch, draft]
  );

  const duplicate = useCallback(
    id => {
      const onboarding = DraftOnboarding.duplicate(draft, id);
      dispatch(updateOnboarding(draft.id, onboarding));
    },
    [dispatch, draft]
  );

  const endDrag = () => {
    dispatch(updateOnboarding(draft.id, { ...draft.onboarding, steps }));
  };

  return (
    <>
      {steps.map((step, index) => (
        <MenuItem
          key={step.id}
          index={index}
          step={step}
          selected={selection.isOnboardingStep(step.id)}
          onSelect={onSelect}
          onDuplcate={duplicate}
          onUpdate={update}
          onRemove={remove}
          onMove={move}
          onEndDrag={endDrag}
        />
      ))}
    </>
  );
}

OnboardingMenu.propTypes = {
  draft: draftProps.isRequired,
  selection: PropTypes.instanceOf(FormSelection).isRequired,
  onSelect: PropTypes.func.isRequired,
};
