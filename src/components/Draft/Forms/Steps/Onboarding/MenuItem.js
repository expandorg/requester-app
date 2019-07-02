import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import { useDrag, useDrop } from 'react-dnd';

import useToggle from '../../../../common/useToggle';
import { draftOnboardingStepProps } from '../../../../shared/propTypes';

import { ContextMenuItem } from '../../../../common/ContextMenu';

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
  selected,
  index,
  onSelect,
  onDuplcate,
  onRemove,
  onMove,
  onUpdate,
  onEndDrag,
}) {
  const ref = useRef(null);
  const [quiz, toggleQuiz] = useToggle();
  const [menu, toggleMenu] = useToggle();

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

  const select = useCallback(
    () => onSelect(FormSelection.onboarding(step.id)),
    [onSelect, step.id]
  );

  return (
    <NavItem selected={selected} ref={drag(drop(ref))} onClick={select}>
      <NavItemText>{step.name}</NavItemText>&nbsp;→
      {step.isGroup && <SettingsButton onClick={toggleQuiz} />}
      <NavItemContextMenu visible={menu} onToggle={toggleMenu}>
        <ContextMenuItem onClick={duplicate}>Duplicate</ContextMenuItem>
        <ContextMenuItem onClick={remove}>Remove</ContextMenuItem>
      </NavItemContextMenu>
      <Quiz
        group={step}
        visible={quiz}
        onHide={toggleQuiz}
        onUpdate={updateQuiz}
      />
    </NavItem>
  );
}

OnboardingMenuItem.propTypes = {
  step: draftOnboardingStepProps.isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDuplcate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onEndDrag: PropTypes.func.isRequired,
};
