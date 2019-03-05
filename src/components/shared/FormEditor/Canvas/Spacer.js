import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Spacer.module.styl';

export default function Spacer({ className, visible, width }) {
  const style = visible
    ? {
        width,
        minWidth: width,
      }
    : undefined;
  return <div className={cn(styles.spacer, className)} style={style} />;
}

Spacer.propTypes = {
  visible: PropTypes.bool.isRequired,
  width: PropTypes.number,
  className: PropTypes.string,
};

Spacer.defaultProps = {
  className: null,
  width: 540,
};
