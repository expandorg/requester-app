import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as MenuIcon } from '../../../menu.svg';

import {
  ContextMenu,
  ContextMenuItem,
} from '../../../../../../../common/ContextMenu';

import styles from './DeleteMenu.module.styl';

export default function DeleteMenu({ onDelete }) {
  const [visible, setVisible] = useState(false);
  const toggle = useCallback(
    evt => {
      evt.stopPropagation();
      setVisible(!visible);
    },
    [visible]
  );
  const del = useCallback(
    evt => {
      evt.stopPropagation();
      setVisible(!visible);
      onDelete();
    },
    [onDelete, visible]
  );
  return (
    <div className={styles.container}>
      <button className={styles.toggle} onClick={toggle}>
        <MenuIcon />
      </button>
      {visible && (
        <ContextMenu onHide={toggle} className={styles.menu}>
          <ContextMenuItem onClick={del}>Remove</ContextMenuItem>
        </ContextMenu>
      )}
    </div>
  );
}

DeleteMenu.propTypes = {
  onDelete: PropTypes.func.isRequired,
};
