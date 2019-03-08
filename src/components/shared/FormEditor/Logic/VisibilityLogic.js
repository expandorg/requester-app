import React from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@expandorg/modules';

import { getVisibilityLogic, ModuleLogic } from '../model/logic';

import { If, Then, Statement } from './Statements';

const visibilityActions = ['hide', 'show'];

export default function VisibilityLogic({
  module,
  variables,
  values,
  onChange,
}) {
  const { expression, action } = getVisibilityLogic(module);

  const changeExpression = updated => {
    onChange(ModuleLogic.set(module, action, updated));
  };

  const changeAction = updated => {
    onChange(
      ModuleLogic.set(ModuleLogic.unset(module, action), updated, expression)
    );
  };

  return (
    <Statement>
      <If
        expression={expression}
        variables={variables}
        values={values}
        onChange={changeExpression}
      />
      <Then
        name={module.name}
        actions={visibilityActions}
        action={action}
        onChange={changeAction}
      />
    </Statement>
  );
}

VisibilityLogic.propTypes = {
  module: moduleProps.isRequired,
  variables: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};

VisibilityLogic.defaultProps = {
  variables: [],
  values: [],
};
