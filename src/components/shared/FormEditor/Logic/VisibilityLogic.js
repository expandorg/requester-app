import React from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@expandorg/modules';

import { If, Then } from './Statements';

const getVisibility = module => {
  if (!module.logic || !module.logic.visibility) {
    return { condition: null, success: false };
  }
  return module.logic.visibility;
};

const actions = ['hide', 'show'];

const getAction = ({ success }) => (!success ? 'hide' : 'show');

export default function VisibilityLogic({
  module,
  variables,
  values,
  onChange,
}) {
  const visibility = getVisibility(module);
  const changeIf = () => {
    onChange(module);
  };
  const changeThen = () => {
    onChange(module);
  };
  return (
    <>
      <If
        expression={visibility.condition}
        variables={variables}
        values={values}
        onChange={changeIf}
      />
      <Then
        name={module.name}
        actions={actions}
        action={getAction(visibility)}
        onChange={changeThen}
      />
    </>
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
