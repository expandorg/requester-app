import React, { Component } from 'react';
import PropTypes from 'prop-types';

import parse from 'date-fns/parse';

import { userProps } from '@expandorg/app-auth';
import { Button, DateTimePicker } from '@expandorg/components';

import { ReactComponent as Arrow } from '../../../../assets/arrow-down.svg';
import { draftProps } from '../../../../shared/propTypes';
import EmailConfirmed from '../../../../shared/EmailConfirmed';

import { formatDate } from '../../../../../model/draft';

import Menu from './Menu';

import styles from './styles.module.styl';

export default class PublishButton extends Component {
  static propTypes = {
    user: userProps.isRequired,
    draft: draftProps.isRequired,
    onPublish: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
  };

  state = {
    schedule: false,
  };

  handlePublishClick = evt => {
    const { onPublish } = this.props;
    onPublish();
    this.handleToggleSchedule();

    evt.preventDefault();
  };

  handleSchedulePublish = dateTime => {
    const { onPublish, draft } = this.props;
    if (draft.endDate && parse(draft.endDate) < dateTime) {
      const endDate = formatDate(parse(draft.endDate));
      this.setState({
        error: `Task should not starts before ${endDate}`,
      });
    } else {
      onPublish(dateTime);
      this.handleToggleSchedule();
    }
  };

  handleToggleSchedule = () => {
    this.setState(({ schedule }) => ({ schedule: !schedule }));
  };

  render() {
    const { readOnly, user, draft } = this.props;
    const { schedule, error } = this.state;

    const disabledDays = {
      before: new Date(),
      after: draft.endDate ? parse(draft.endDate) : undefined,
    };

    return (
      <div className={styles.group}>
        <EmailConfirmed user={user}>
          {({ onToggle, dialog }) => (
            <>
              <Button
                className={styles.toggle}
                disabled={readOnly}
                onClick={onToggle}
              >
                Publish
                <Arrow className={styles.arrow} />
              </Button>
              {dialog && (
                <Menu
                  onPublish={this.handlePublishClick}
                  onSchedule={this.handleToggleSchedule}
                  onToggle={onToggle}
                />
              )}
            </>
          )}
        </EmailConfirmed>
        {schedule && (
          <DateTimePicker
            error={error}
            className={styles.picker}
            disabledDays={disabledDays}
            onHide={this.handleToggleSchedule}
            onChange={this.handleSchedulePublish}
          />
        )}
      </div>
    );
  }
}
