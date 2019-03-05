import React from 'react';
import PropTypes from 'prop-types';

import { Row, Text } from './components';

export default function If({ expression, variables, values, onChange }) {
  console.log(expression, variables, values, onChange);

  return (
    <Row>
      <Text>if </Text>
    </Row>
  );
}

If.propTypes = {
  expression: PropTypes.arrayOf(PropTypes.any),
  variables: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};

If.defaultProps = {
  expression: [],
  variables: [],
  values: [],
};
