import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import { useDrag, useDrop } from 'react-dnd';
import { useToggle } from '@expandorg/components';
import { ContextMenuItem } from '@expandorg/components/app';

import { draftOnboardingStepProps } from '../../../../shared/propTypes';

import {
  SettingsButton,
  NavItem,
  NavItemText,
  NavItemContextMenu,
} from '../controls';

import Quiz from '../../Quiz/Quiz';
import { source, target } from './dnd';

import { FormSelection } from '../../forms';

export default function OnboardingMenuItem({
  step,
  index,
  selection,
  onSelect,
  onDuplcate,
  onRemove,
  onMove,
  onUpdate,
  onEndDrag,
}) {
  const ref = useRef(null);
  const [menu, toggleMenu] = useToggle();

  const selected = selection.isOnboardingStep(step.id);

  const [, drag] = useDrag(source(index, onEndDrag));
  const [, drop] = useDrop(target(ref, index, onMove));

  const duplicate = useCallback(
    evt => {
      evt.stopPropagation();
      toggleMenu();
      onDuplcate(step.id);
    },
    [onDuplcate, step.id, toggleMenu]
  );

  const remove = useCallback(
    evt => {
      evt.stopPropagation();
      toggleMenu();
      onRemove(step.id);
    },
    [onRemove, step.id, toggleMenu]
  );

  const updateQuiz = useCallback(
    updated => {
      onUpdate(updated, true);
    },
    [onUpdate]
  );

  const select = useCallback(() => {
    console.log('hide');
    onSelect(FormSelection.onboarding(step.id));
  }, [onSelect, step.id]);

  const selectQuiz = useCallback(
    evt => {
      evt.preventDefault();
      evt.stopPropagation();
      onSelect(FormSelection.onboarding(step.id, true));
    },
    [onSelect, step.id]
  );
  return (
    <>
      <NavItem selected={selected} ref={drag(drop(ref))} onClick={select}>
        <NavItemText>{step.name}</NavItemText>
        {step.isGroup && <SettingsButton onClick={selectQuiz} />}
        <NavItemContextMenu visible={menu} onToggle={toggleMenu}>
          <ContextMenuItem onClick={duplicate}>Duplicate</ContextMenuItem>
          <ContextMenuItem onClick={remove}>Remove</ContextMenuItem>
        </NavItemContextMenu>
      </NavItem>
      {selection.quizDialog(step.id) && (
        <Quiz group={step} onHide={select} onUpdate={updateQuiz} />
      )}
    </>
  );
}

OnboardingMenuItem.propTypes = {
  step: draftOnboardingStepProps.isRequired,
  index: PropTypes.number.isRequired,
  selection: PropTypes.instanceOf(FormSelection).isRequired,
  onSelect: PropTypes.func.isRequired,
  onDuplcate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onEndDrag: PropTypes.func.isRequired,
};
