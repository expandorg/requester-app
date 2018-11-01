import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Placeholder.module.styl';

const Placeholder = ({ className }) => (
  <div className={cn(styles.placehoder, className)}>Drop here</div>
);

Placeholder.propTypes = {
  className: PropTypes.string,
};

Placeholder.defaultProps = {
  className: null,
};

export default Placeholder;
