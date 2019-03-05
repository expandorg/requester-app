import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';
import { moduleProps } from '@expandorg/modules';

import styles from './LogicEditor.module.styl';

export default function LogicEditor({ module, onCancel }) {
  console.log(module);

  const handleSave = () => {};

  return (
    <div className={styles.container}>
      <h1>test</h1>
      <div className={styles.actions}>
        <Button theme="grey" size="small" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} size="small">
          Save
        </Button>
      </div>
    </div>
  );
}

LogicEditor.propTypes = {
  module: moduleProps.isRequired,
  onCancel: PropTypes.func.isRequired,
};
