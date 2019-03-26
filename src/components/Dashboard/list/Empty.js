import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import styles from './Empty.module.styl';

export default class Empty extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Link to="/draft/create" className={styles.new}>
          <div className={styles.plus}>+</div>
          <div className={styles.create}>create your first task</div>
        </Link>
      </div>
    );
  }
}
