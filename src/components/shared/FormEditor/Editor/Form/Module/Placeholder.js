import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Placeholder.module.styl';

const Placeholder = ({ title, className, connectDropTarget }) =>
  connectDropTarget(
    <div className={cn(styles.placehoder, className)}>{title}</div>
  );

Placeholder.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  connectDropTarget: PropTypes.func,
};

Placeholder.defaultProps = {
  title: 'Drop here',
  className: null,
  connectDropTarget: f => f,
};

export default Placeholder;
