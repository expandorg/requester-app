import PropTypes from 'prop-types';

export const historyProps = PropTypes.shape({
  replace: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
});

export const locationProps = PropTypes.shape({
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
});

export const notificationProps = PropTypes.shape({
  type: PropTypes.oneOf(['warning, message, success']).isRequired,
  message: PropTypes.string,
});
