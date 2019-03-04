import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Tooltip } from '@expandorg/components';

import './IconButton.styl';

const IconButton = ({ children, onClick, className, ...rest }) => (
  <button
    onClick={onClick}
    className={cn('gem-iconbutton', className)}
    {...rest}
  >
    {children}
  </button>
);

IconButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

IconButton.defaultProps = {
  className: null,
  onClick: undefined,
};

export default Tooltip(IconButton);
