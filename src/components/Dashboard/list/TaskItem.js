import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { ReactComponent as MoreIcon } from '../../assets/more.svg';
import I from '../../common/I';

import TaskItemMenu from './TaskItemMenu';

import { TaskState } from '../../../model/enums';
import { TaskStateTitles } from '../../../model/i18n';
import { formatDate } from '../../../model/draft';

import styles from './styles.module.styl';

const canCopyStates = [
  TaskState.draft,
  TaskState.completed,
  TaskState.scheduled,
];

const canDeleteStates = [
  TaskState.draft,
  TaskState.completed,
  TaskState.scheduled,
];

const getTaskTooltip = task => {
  if (task.state === TaskState.inprogress) {
    if (task.endDate) {
      return `Still running. Task is due to end on ${formatDate(
        task.endDate
      )}.`;
    }
  }
  if (task.state === TaskState.scheduled) {
    return `Scheduled for ${formatDate(task.startDate)}`;
  }
  return null;
};

const getStatusTitle = task => {
  const tooltip = getTaskTooltip(task);

  if (tooltip) {
    return (
      <span>
        {TaskStateTitles[task.state]}
        <I
          className={styles.check}
          tooltip={tooltip}
          tooltipOrientation="right"
        />
      </span>
    );
  }
  return TaskStateTitles[task.state];
};

export default class TaskItem extends Component {
  static propTypes = {
    task: PropTypes.object.isRequired, // eslint-disable-line
    onDelete: PropTypes.func,
    onCopy: PropTypes.func,
  };

  static defaultProps = {
    onDelete: Function.prototype,
    onCopy: Function.prototype,
  };

  state = {
    menu: false,
  };

  handleCopy = () => {
    const { onCopy, task } = this.props;
    onCopy(task);
  };

  handleDelete = () => {
    const { onDelete, task } = this.props;
    onDelete(task);
  };

  handleToggle = evt => {
    evt.preventDefault();
    this.setState(({ menu }) => ({ menu: !menu }));
  };

  handleHide = () => {
    this.setState({ menu: false });
  };

  render() {
    const { task } = this.props;
    const { menu } = this.state;

    const to =
      task.state === TaskState.draft
        ? `/draft/${task.draftId}`
        : `/task/${task.taskId}`;

    const canCopy = canCopyStates.includes(task.state);
    const canDelete = canDeleteStates.includes(task.state);

    return (
      <Link className={cn(styles.container, styles.task)} to={to}>
        <div className={styles.actions}>
          <div className={styles.menuContainer}>
            <button onClick={this.handleToggle} className={styles.more}>
              <MoreIcon width="15" height="15" viewBox="0 0 15 4" />
            </button>
            {menu && (
              <TaskItemMenu
                canCopy={canCopy}
                canDelete={canDelete}
                onCopy={this.handleCopy}
                onDelete={this.handleDelete}
                onHide={this.handleHide}
              />
            )}
          </div>
        </div>
        <div className={styles.logo}>
          <img src={task.logo} className={styles.img} alt={task.title} />
        </div>
        <div className={styles.title}>{task.title}</div>
        <div className={styles.state}>{getStatusTitle(task)}</div>
      </Link>
    );
  }
}
