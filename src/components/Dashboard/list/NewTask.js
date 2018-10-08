import React, { Component } from 'react';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import styles from './styles.module.styl';

export default class NewTask extends Component {
  render() {
    return (
      <Link to="/task/create" className={cn(styles.container, styles.new)}>
        <div className={styles.plus}>+</div>
        <div className={styles.create}>create task</div>
      </Link>
    );
  }
}
