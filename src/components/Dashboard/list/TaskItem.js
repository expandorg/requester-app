import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { ReactComponent as MoreIcon } from '@expandorg/uikit/assets/more.svg';
import I from '../../common/I';

import TaskItemMenu from './TaskItemMenu';
import DraftLogo from '../../shared/DraftLogo';

import { DraftStatus } from '../../../model/enums';
import { formatDate, DraftStatusTitles } from '../../../model/i18n';

import styles from './styles.module.styl';

const canCopyStates = [
  DraftStatus.draft,
  DraftStatus.completed,
  DraftStatus.scheduled,
];

const canDeleteStates = [
  DraftStatus.draft,
  DraftStatus.completed,
  DraftStatus.scheduled,
];

const getTaskTooltip = task => {
  if (task.status === DraftStatus.inprogress) {
    if (task.endDate) {
      return `Still running. Task is due to end on ${formatDate(
        task.endDate
      )}.`;
    }
  }
  if (task.state === DraftStatus.scheduled) {
    return `Scheduled for ${formatDate(task.startDate)}`;
  }
  return null;
};

const getStatusTitle = task => {
  const tooltip = getTaskTooltip(task);

  if (tooltip) {
    return (
      <span>
        {DraftStatusTitles[task.state]}
        <I
          className={styles.check}
          tooltip={tooltip}
          tooltipOrientation="right"
        />
      </span>
    );
  }
  return DraftStatusTitles[task.status];
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
      task.status === DraftStatus.draft || task.status === DraftStatus.pending
        ? `/draft/${task.id}`
        : `/task/${task.taskId}`;

    const canCopy = canCopyStates.includes(task.status);
    const canDelete = canDeleteStates.includes(task.status);

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
          <DraftLogo logo={task.logo} name={task.name} className={styles.img} />
        </div>
        <div className={styles.title}>{task.name}</div>
        <div className={styles.status}>{getStatusTitle(task)}</div>
      </Link>
    );
  }
}
