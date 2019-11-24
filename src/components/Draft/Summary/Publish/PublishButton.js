import React, { Component } from 'react';
import PropTypes from 'prop-types';

import parse from 'date-fns/parse';
import startOfHour from 'date-fns/start_of_hour';
import addHours from 'date-fns/add_hours';

import { userProps } from '@expandorg/app-auth';
import { Button, DateTimePicker } from '@expandorg/components';

// import { ReactComponent as Arrow } from '@expandorg/uikit/assets/arrow-down.svg';
import { EmailConfirmed } from '@expandorg/app-account/components';

import { draftProps } from '../../../shared/propTypes';
import { formatDate } from '../../../../model/i18n';

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
    initialDate: addHours(startOfHour(new Date()), 1),
  };

  handlePublishClick = evt => {
    const { onPublish } = this.props;
    onPublish();
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
    const { schedule, error, initialDate } = this.state;

    const disabledDays = {
      before: new Date(),
      after: draft.endDate ? parse(draft.endDate) : undefined,
    };

    return (
      <div className={styles.group}>
        <EmailConfirmed user={user} onConfirmed={this.handlePublishClick}>
          {({ onToggle, dialog }) => (
            <>
              <Button
                className={styles.toggle}
                disabled={readOnly}
                theme={readOnly ? 'grey' : 'primary'}
                onClick={onToggle}
              >
                Send for review
                {/* <Arrow className={styles.arrow} /> */}
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
            value={initialDate}
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
