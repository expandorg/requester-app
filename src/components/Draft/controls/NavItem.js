import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './NavItem.module.styl';

export default function NavItem({ children, onClick, active, ...rest }) {
  const classes = cn(styles.item, { [styles.active]: active });
  return (
    <button className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

NavItem.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

NavItem.defaultProps = {
  active: false,
  onClick: Function.prototype,
};
