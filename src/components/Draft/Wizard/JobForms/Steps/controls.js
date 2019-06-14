/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useClickOutside } from '@expandorg/components';

import { ReactComponent as SettingsIcon } from './settings.svg';

import styles from './controls.module.styl';

export function Navs({ children }) {
  return <div className={styles.menu}>{children}</div>;
}

export function NavItem({ children, selected, onClick }) {
  const classes = cn(styles.item, { [styles.selected]: selected });

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
}

NavItem.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

NavItem.defaultProps = {
  onClick: Function.prototype,
  selected: false,
};

export function ContextMenu({ onHide, className, children }) {
  const ref = useRef();
  useClickOutside(ref, () => onHide());

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
