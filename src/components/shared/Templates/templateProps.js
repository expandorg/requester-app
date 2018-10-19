// @flow
import PropTypes from 'prop-types';

import { formProps } from '@gemsorg/modules';

const templateProps = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  logo: PropTypes.string,
  description: PropTypes.string,
  form: formProps,
});

export default templateProps;
