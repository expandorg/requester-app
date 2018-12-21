import React from 'react';
import PropTypes from 'prop-types';

const Entity = ({ className, mention }) => (
  <span className={className}>{mention.suggestion}</span>
);

Entity.propTypes = {
  className: PropTypes.string,
  mention: PropTypes.shape({
    name: PropTypes.string,
    suggestion: PropTypes.string,
  }).isRequired,
};

Entity.defaultProps = {
  className: null,
};

export default Entity;
