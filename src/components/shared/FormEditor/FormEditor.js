import React, { Component } from 'react';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import AvailableModules from './Available/AvailableModules';
import Form from './Form';

import styles from './FormEditor.module.styl';

export default class FormEditor extends Component {
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className={styles.container}>
          <div className={styles.left}>
            <AvailableModules />
          </div>
          <div className={styles.form}>
            <Form />
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}
