import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import immer from 'immer';

import { useDispatch } from 'react-redux';

import { draftProps } from '../../../../../shared/propTypes';
import { updateOnboarding } from '../../../../../../sagas/draftsSagas';
import { FormSelection } from '../../forms';

import MenuItem from './MenuItem';
import { DraftManager } from '../../../../../../model/draft';

const getSteps = draft => (draft.onboarding && draft.onboarding.steps) || [];

export default function OnboardingMenu({ draft, selection, onSelect }) {
  const dispatch = useDispatch();

  const [steps, setSteps] = useState(getSteps(draft));

  useEffect(() => {
    setSteps(getSteps(draft));
  }, [draft]);

  const remove = index => {
    dispatch(
      updateOnboarding(
        draft.id,
        DraftManager.removeOnboardingStep(draft.onboarding, steps, index)
      )
    );
  };

  const move = useCallback(
    (dragIndex, hoverIndex) => {
      const dragged = steps[dragIndex];
      const hovered = steps[hoverIndex];
      setSteps(
        immer(steps, d => {
          d[dragIndex] = hovered;
          d[hoverIndex] = dragged;
        })
      );
    },
    [steps]
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
          selected={selection.isOnboardingStep(index)}
          onSelect={() => onSelect(FormSelection.onboarding(index))}
          onDuplcate={Function.prototype}
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
