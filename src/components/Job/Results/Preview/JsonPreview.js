import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './JsonPreview.module.styl';

export default function JsonPreview({ value, className }) {
  return (
    <div className={cn(styles.container, className)}>
      {JSON.stringify(value, undefined, 2)}
    </div>
  );
}

JsonPreview.propTypes = {
  value: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
};

JsonPreview.defaultProps = {
  className: null,
};
