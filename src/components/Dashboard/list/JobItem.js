import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Link } from 'react-router-dom';

import { ReactComponent as MoreIcon } from '@expandorg/uikit/assets/more.svg';
import { JobLogo } from '@expandorg/components/app';
import I from '../../common/I';

import JobItemMenu from './JobItemMenu';

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

const getTooltip = draft => {
  if (draft.status === DraftStatus.inprogress) {
    if (draft.endDate) {
      return `Still running. Task is due to end on ${formatDate(
        draft.endDate
      )}.`;
    }
  }
  if (draft.state === DraftStatus.scheduled) {
    return `Scheduled for ${formatDate(draft.startDate)}`;
  }
  return null;
};

const getStatusTitle = task => {
  const tooltip = getTooltip(task);

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

export default class JobItem extends Component {
  static propTypes = {
    draft: PropTypes.object.isRequired, // eslint-disable-line
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
    const { onCopy, draft } = this.props;
    onCopy(draft);
  };

  handleDelete = () => {
    const { onDelete, draft } = this.props;
    onDelete(draft);
  };

  handleToggle = evt => {
    evt.preventDefault();
    this.setState(({ menu }) => ({ menu: !menu }));
  };

  handleHide = () => {
    this.setState({ menu: false });
  };

  render() {
    const { draft } = this.props;
    const { menu } = this.state;

    const to =
      draft.status === DraftStatus.draft || draft.status === DraftStatus.pending
        ? `/draft/${draft.id}`
        : `/job/${draft.jobId}`;

    const canCopy = canCopyStates.includes(draft.status);
    const canDelete = canDeleteStates.includes(draft.status);

    return (
      <Link className={cn(styles.container, styles.task)} to={to}>
        <div className={styles.actions}>
          <div className={styles.menuContainer}>
            <button onClick={this.handleToggle} className={styles.more}>
              <MoreIcon width="15" height="15" viewBox="0 0 15 4" />
            </button>
            {menu && (
              <JobItemMenu
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
          <JobLogo src={draft.logo} name={draft.name} className={styles.img} />
        </div>
        <div className={styles.title}>{draft.name}</div>
        <div className={styles.status}>{getStatusTitle(draft)}</div>
      </Link>
    );
  }
}
