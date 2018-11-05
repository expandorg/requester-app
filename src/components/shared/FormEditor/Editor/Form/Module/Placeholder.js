import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Placeholder.module.styl';

const Placeholder = ({ className, connectDropTarget }) =>
  connectDropTarget(
    <div className={cn(styles.placehoder, className)}>Drop here</div>
  );

Placeholder.propTypes = {
  className: PropTypes.string,
  connectDropTarget: PropTypes.func,
};

Placeholder.defaultProps = {
  className: null,
  connectDropTarget: f => f,
};

export default Placeholder;
