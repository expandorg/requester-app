import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useDrag, useDrop } from 'react-dnd';

import useToggle from '../../../../../common/useToggle';
import { draftOnboardingStepProps } from '../../../../../shared/propTypes';

import {
  SettingsButton,
  NavItem,
  NavItemText,
  NavItemContextMenu,
  ContextMenuItem,
} from '../controls';

import QuizSettings from './QuizSettings';
import { source, target } from './dnd';

import styles from './MenuItem.module.styl';
import { FormSelection } from '../../forms';

export default function OnboardingMenuItem({
  step,
  selected,
  index,
  onSelect,
  onDuplcate,
  onRemove,
  onMove,
  onEndDrag,
}) {
  const ref = useRef(null);
  const [quiz, toggleQuiz] = useToggle();
  const [menu, toggleMenu] = useToggle();

  const [{ isDragging }, drag] = useDrag(source(index, onEndDrag));
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

  const select = useCallback(
    () => onSelect(FormSelection.onboarding(step.id)),
    [onSelect, step.id]
  );

  const classes = cn({
    [styles.dragging]: isDragging,
  });

  return (
    <NavItem
      className={classes}
      selected={selected}
      ref={drag(drop(ref))}
      onClick={select}
    >
      <NavItemText>{step.name}</NavItemText>&nbsp;→&nbsp;
      {step.isGroup && <SettingsButton onClick={toggleQuiz} />}
      <NavItemContextMenu visible={menu} onToggle={toggleMenu}>
        <ContextMenuItem onClick={duplicate}>Duplicate</ContextMenuItem>
        <ContextMenuItem onClick={remove}>Remove</ContextMenuItem>
      </NavItemContextMenu>
      <QuizSettings visible={quiz} onHide={toggleQuiz} />
    </NavItem>
  );
}

OnboardingMenuItem.propTypes = {
  step: draftOnboardingStepProps.isRequired,
  index: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDuplcate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onEndDrag: PropTypes.func.isRequired,
};
