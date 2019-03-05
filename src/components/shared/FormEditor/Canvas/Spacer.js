import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Spacer.module.styl';

export default function Spacer({ className, visible }) {
  return (
    <div
      className={cn(styles.spacer, { [styles.expanded]: visible }, className)}
    />
  );
}

Spacer.propTypes = {
  visible: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

Spacer.defaultProps = {
  className: null,
};
