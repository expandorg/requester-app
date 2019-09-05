/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useToggle } from '@expandorg/components';
import { ContextMenu, ContextMenuItem } from '@expandorg/components/app';

import { ReactComponent as MoreIcon } from '@expandorg/uikit/assets/more.svg';

import { ReactComponent as Visible } from '@expandorg/uikit/assets/visible.svg';
import { ReactComponent as Invisible } from '@expandorg/uikit/assets/invisible.svg';

import { moduleProps } from '@expandorg/modules';

import styles from './Header.module.styl';

const isVisible = module => {
  return !module.logic.show;
};
// const isVisibilityAllowed = module => module.type !== 'submit';
const isCopyAllowed = module => module.type !== 'submit';

export default function Header({ module, onSelect, onCopy, onRemove }) {
  const [menu, toggle] = useToggle();
  const copy = useCallback(() => {
    toggle();
    onCopy();
  }, [onCopy, toggle]);

  const remove = useCallback(() => {
    toggle();
    onRemove();
  }, [onRemove, toggle]);

  return (
    <div className={styles.container}>
      <div className={styles.name} onClick={onSelect}>
        {module.name}
      </div>
      <div className={styles.actions}>
        {module.logic && (isVisible(module) ? <Visible /> : <Invisible />)}
        <button onClick={toggle} className={styles.more}>
          <MoreIcon width="15" height="15" viewBox="0 0 15 4" />
        </button>
        {menu && (
          <ContextMenu onHide={toggle}>
            {isCopyAllowed(module) && (
              <ContextMenuItem onClick={copy}>Duplicate</ContextMenuItem>
            )}
            {/* <ContextMenuItem>Manage logic</ContextMenuItem> */}
            <ContextMenuItem onClick={remove}>Delete</ContextMenuItem>
          </ContextMenu>
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  module: moduleProps.isRequired,
  onSelect: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
