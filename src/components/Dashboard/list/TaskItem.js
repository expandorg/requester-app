import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { Tooltip } from '@gemsorg/components';

import { ReactComponent as CopyIcon } from '../../assets/copy.svg';

import { TaskStateTitles } from '../../../model/i18n';

import styles from './styles.module.styl';

const Copy = Tooltip(({ children, ...props }) => (
  <button {...props} className={styles.copyBtn}>
    <CopyIcon />
    {children}
  </button>
));

export default class TaskItem extends Component {
  static propTypes = {
    task: PropTypes.object.isRequired, // eslint-disable-line
  };

  handleCopyClick = evt => {
    evt.preventDefault();
    evt.stopPropagation();
  };

  render() {
    const { task } = this.props;

    const to =
      task.state === 'draft'
        ? `/draft/${task.draftId}`
        : `/task/${task.taskId}`;

    return (
      <Link className={cn(styles.container, styles.task)} to={to}>
        <div className={styles.copy}>
          <Copy onClick={this.handleCopyClick} tooltip="Copy" />
        </div>
        <div className={styles.logo}>
          <img src={task.logo} className={styles.img} alt={task.title} />
        </div>
        <div className={styles.title}>{task.title}</div>
        <div className={styles.state}>{TaskStateTitles[task.state]}</div>
      </Link>
    );
  }
}
