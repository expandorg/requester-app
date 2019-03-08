import React from 'react';
import PropTypes from 'prop-types';

// import { getVariableName } from '@expandorg/modules/model';

import { Row } from './components';

// function Conditional({ expression, options, onChange }) {
//   return (
//     <>
//       <Dropdown
//         bold
//         value={expression[0]}
//         options={options}
//         formatter={getVariableName}
//       />
//       <Dropdown value={expression[1]} options={ops} onChange={changeOp} />
//       <Dropdown
//         value={expression[2]}
//         options={options}
//         formatter={getVariableName}
//         onChange={changeValue}
//       />
//     </>
//   );
// }

export default function NestedConditional({ expression, options, onChange }) {
  console.log(expression, options, onChange);

  return (
    <>
      {expression.map(() => (
        <Row />
      ))}
    </>
  );
}

NestedConditional.propTypes = {
  expression: PropTypes.arrayOf(PropTypes.any),
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};

NestedConditional.defaultProps = {
  expression: [],
  options: [],
};
