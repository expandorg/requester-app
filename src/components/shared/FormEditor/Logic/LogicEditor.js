import React from 'react';

import { moduleProps } from '@expandorg/modules';

import styles from './LogicEditor.module.styl';

export default function LogicEditor({ module }) {
  console.log(module);

  return (
    <div className={styles.container}>
      <h1>test</h1>
    </div>
  );
}

LogicEditor.propTypes = {
  module: moduleProps.isRequired,
};
