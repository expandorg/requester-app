import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { getFormModulesNames } from '@expandorg/modules/model';

import { Button } from '@expandorg/components';
import { moduleProps } from '@expandorg/modules';

import VisibilityLogic from './VisibilityLogic';

import styles from './LogicEditor.module.styl';

const getUniqNames = modules => [...new Set(getFormModulesNames({ modules }))];

const cleanupExpr = expr => {
  if (!expr || !Array.isArray(expr)) {
    return expr;
  }
  return expr.filter(term => !Array.isArray(term) || term.length !== 0);
};

const cleanup = module => {
  if (!module.logic) {
    return module;
  }
  const logic = Reflect.ownKeys(module.logic).reduce((updated, key) => {
    updated[key] = cleanupExpr(module.logic[key]);
    return updated;
  }, {});
  return { ...module, logic };
};

export default function LogicEditor({
  module: original,
  modules,
  variables,
  onSave,
  onCancel,
}) {
  const [module, setModule] = useState(original);
  const values = useMemo(() => getUniqNames(modules), [modules]);

  return (
    <div className={styles.container}>
      <VisibilityLogic
        module={module}
        variables={variables}
        values={values}
        onChange={setModule}
      />
      <div className={styles.actions}>
        <Button theme="grey" size="small" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(cleanup(module))} size="small">
          Save
        </Button>
      </div>
    </div>
  );
}

LogicEditor.propTypes = {
  module: moduleProps.isRequired,
  modules: PropTypes.arrayOf(moduleProps),
  variables: PropTypes.arrayOf(PropTypes.string),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

LogicEditor.defaultProps = {
  modules: [],
  variables: [],
};
