/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as SettingsIcon } from './settings.svg';
import { ReactComponent as MenuIcon } from './menu.svg';

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
