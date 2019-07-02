/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { forwardRef, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Portal } from '@expandorg/components';
import { ReactComponent as SettingsIcon } from './settings.svg';

import { ReactComponent as Down } from '../../../../assets/arrow_drop_down.svg';
import { ReactComponent as Up } from '../../../../assets/arrow_drop_up.svg';
import { ReactComponent as Warning } from '../../../../assets/warning.svg';

import { ContextMenu } from '../../../common/ContextMenu';

import styles from './controls.module.styl';

export function Navs({ children }) {
  return <div className={styles.menu}>{children}</div>;
}

export const NavItem = forwardRef(
  ({ children, selected, onClick, className }, ref) => {
    const classes = cn(styles.item, { [styles.selected]: selected }, className);
    return (
      <div ref={ref} className={classes} onClick={onClick}>
        {children}
      </div>
    );
  }
);

NavItem.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  selected: PropTypes.bool,
};

NavItem.defaultProps = {
  onClick: Function.prototype,
  className: null,
  selected: false,
};

export function NavItemText({ children }) {
  return <span className={styles.itemText}>{children}</span>;
}

export function ErrorIcon({ error }) {
  return error ? <Warning className={styles.warning} /> : null;
}

ErrorIcon.propTypes = {
  error: PropTypes.shape({}),
};

ErrorIcon.defaultProps = {
  error: null,
};

export function NavItemContextMenu({ visible, onToggle, children }) {
  const btn = useRef(null);
  const [pos, setPos] = useState(null);

  const toggle = useCallback(
    evt => {
      evt.preventDefault();
      evt.stopPropagation();
      if (!visible) {
        setPos(btn.current.getBoundingClientRect());
      }
      onToggle();
    },
    [onToggle, visible]
  );
  const Icon = visible ? Up : Down;
  return (
    <>
      <button ref={btn} className={styles.contextMenuButton} onClick={toggle}>
        <Icon />
      </button>
      {visible && pos && (
        <Portal
          className={styles.portal}
          style={{ left: pos.left, top: pos.top }}
        >
          <ContextMenu className={styles.contextMenu} onHide={onToggle}>
            {children}
          </ContextMenu>
        </Portal>
      )}
    </>
  );
}

NavItemContextMenu.propTypes = {
  onToggle: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export function SettingsButton(props) {
  return (
    <button {...props} className={styles.settingsButton}>
      <SettingsIcon
        className={styles.settingsIcon}
        width="14"
        height="14"
        viewBox="0 0 20 20"
      />
    </button>
  );
}
