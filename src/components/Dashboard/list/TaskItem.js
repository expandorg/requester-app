import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { ReactComponent as CopyIcon } from '../../assets/copy.svg';

import styles from './styles.module.styl';

export default class TaskItem extends Component {
  static propTypes = {
    task: PropTypes.object.isRequired, // eslint-disable-line
  };

  handleCopyClick = evt => {
    evt.preventDefault();
    evt.stopPropagation();

    console.log('copied');
  };

  render() {
    const { task } = this.props;
    return (
      <Link
        className={cn(styles.container, styles.task)}
        to={`/task/${task.id}`}
      >
        <div className={styles.copy}>
          <button className={styles.copyBtn} onClick={this.handleCopyClick}>
            <CopyIcon />
          </button>
        </div>
        <div className={styles.logo}>
          <img src={task.logo} className={styles.img} alt={task.title} />
        </div>
        <div className={styles.title}>{task.title}</div>
        <div className={styles.state}>{task.state}</div>
      </Link>
    );
  }
}
