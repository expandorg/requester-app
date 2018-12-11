import React, { Component } from 'react';
import PropTypes from 'prop-types';

import parse from 'date-fns/parse';
import Button from '../../../../common/Button';

import { ReactComponent as Arrow } from '../../../../assets/arrow-down.svg';
import { draftProps } from '../../../../shared/propTypes';

import DateTimePicker from '../../../../common/DateTime/DateTimePicker';

import { formatDate } from '../../../../../model/draft';

import Menu from './Menu';

import styles from './styles.module.styl';

export default class PublishButton extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    onPublish: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
  };

  state = {
    menu: false,
    schedule: false,
  };

  handlePublishClick = evt => {
    const { onPublish } = this.props;
    onPublish();
    this.handleHide();

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

  handleToggle = () => {
    this.setState(({ menu }) => ({ menu: !menu }));
  };

  handleHide = () => {
    this.setState({ menu: false });
  };

  handleToggleSchedule = () => {
    this.setState(({ schedule }) => ({ schedule: !schedule }));
  };

  render() {
    const { readOnly, draft } = this.props;
    const { menu, schedule, error } = this.state;

    const disabledDays = {
      before: new Date(),
      after: draft.endDate ? parse(draft.endDate) : undefined,
    };

    return (
      <div className={styles.group}>
        <Button
          className={styles.toggle}
          disabled={readOnly}
          onClick={this.handleToggle}
        >
          Publish
          <Arrow className={styles.arrow} />
        </Button>
        {menu && (
          <Menu
            onPublish={this.handlePublishClick}
            onSchedule={this.handleToggleSchedule}
            onToggle={this.handleHide}
          />
        )}
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
