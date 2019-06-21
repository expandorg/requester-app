/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useClickOutside } from '@expandorg/components';

import { ReactComponent as SettingsIcon } from './settings.svg';
import { ReactComponent as MenuIcon } from './menu.svg';

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

export function ContextMenu({ onHide, className, children }) {
  const ref = useRef();
  useClickOutside(ref, evt => onHide(evt));

  return (
    <div ref={ref} className={cn(styles.contextMenu, className)}>
      {children}
    </div>
  );
}

ContextMenu.propTypes = {
  onHide: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ContextMenu.defaultProps = {
  className: null,
};

export function ContextMenuItem({ className, onClick, children }) {
  return (
    <button onClick={onClick} className={cn(styles.contextMenuItem, className)}>
      {children}
    </button>
  );
}

ContextMenuItem.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

ContextMenuItem.defaultProps = {
  onClick: Function.prototype,
  className: null,
};

export function NavItemContextMenu({ visible, onToggle, children }) {
  return (
    <>
      <button className={styles.contextMenuButton} onClick={onToggle}>
        <MenuIcon />
      </button>
      {visible && <ContextMenu onHide={onToggle}>{children}</ContextMenu>}
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
