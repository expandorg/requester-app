// @flow
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

export const matchProps = PropTypes.shape({
  params: PropTypes.object,
});

export const notificationProps = PropTypes.shape({
  type: PropTypes.oneOf(['warning', 'message', 'success']).isRequired,
  message: PropTypes.string,
});

export const draftProps = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
});

export const dataColumnProps = PropTypes.shape({
  name: PropTypes.string,
  type: PropTypes.string,
  skipped: PropTypes.bool,
});

export const dataProps = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  draftId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  columns: PropTypes.arrayOf(dataColumnProps).isRequired,
  values: PropTypes.arrayOf(PropTypes.any),
  total: PropTypes.number,
});

export const taskTemplateProps = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  logo: PropTypes.string,
  description: PropTypes.string,
});
