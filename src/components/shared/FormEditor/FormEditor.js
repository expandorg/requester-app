import React, { Component } from 'react';

import styles from './FormEditor.module.styl';

import AvailableModules from './Available/AvailableModules';
import Form from './Form';

export default class FormEditor extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <AvailableModules />
        </div>
        <div className={styles.form}>
          <Form />
        </div>
      </div>
    );
  }
}
