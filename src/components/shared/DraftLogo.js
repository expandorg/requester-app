import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './DraftLogo.module.styl';

const getInitials = name => {
  if (!name) {
    return name;
  }
  return name[0];
};

export default function DraftLogo({ logo, name, className }) {
  if (!logo) {
    return (
      <div className={cn(styles.textLogo, className)}>{getInitials(name)}</div>
    );
  }
  return <img src={logo} className={cn(styles.img, className)} alt={name} />;
}

DraftLogo.propTypes = {
  logo: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

DraftLogo.defaultProps = {
  logo: null,
  className: null,
};
