import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';
import { moduleProps } from '@expandorg/modules';

import VisibilityLogic from './VisibilityLogic';

import styles from './LogicEditor.module.styl';

export default function LogicEditor({ module: original, onSave, onCancel }) {
  const [module, setModule] = useState(original);

  return (
    <div className={styles.container}>
      <VisibilityLogic module={module} onChange={setModule} />
      <div className={styles.actions}>
        <Button theme="grey" size="small" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(module)} size="small">
          Save
        </Button>
      </div>
    </div>
  );
}

LogicEditor.propTypes = {
  module: moduleProps.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
