import React, { Component } from 'react';

import Preview from '../../../shared/Templates/Preview';
import mocks from '../../../shared/Templates/template-mocks';

import styles from './Task.module.styl';

export default class Task extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Preview template={mocks[0]} className={styles.preview} />
      </div>
    );
  }
}
