import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Row } from './components';

import Conditional from './Conditional';

const toVar = str => `$(${str})`;

export default function If({ expression, variables, values, onChange }) {
  const options = useMemo(
    () => [...(values || []), ...(variables || [])].map(toVar),
    [variables, values]
  );

  return (
    <Row>
      <Conditional
        prefix="if value of"
        options={options}
        expression={expression}
        onChange={onChange}
      />
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
